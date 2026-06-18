'use client';
import { useIsLoggedIn } from "@/utils/store/auth";

import { Stack, Title, Button, Text, Box, PinInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestOtp } from "../actions";
import { notify } from "@/utils/helperFunctions";
import { apiFetch } from "@/lib/apiFetch";
import { IconDeviceMobileMessage, IconEdit } from "@tabler/icons-react";
import { ErrorResponse, VerifyOtpResponse } from "@/constants/types";
import { useAuthActions } from "@/utils/store/auth";
import { useResendTimer } from "@/utils/hooks/useResendTimer";
import { useCartActions, useCartStore } from "@/utils/store/cart";
import {
    getCartItemsAction,
    mergeGuestCartAction,
} from "@/app/(customer-checkout)/checkout/cartActions";

// Module-level one-shot guard to prevent re-entrant double-merge on rapid
// double submit. Overwrite semantics (D1) make a re-merge harmless, but this
// is defense-in-depth for R1.
let mergeInFlight = false;

const Otp = () => {
    const isLoggedIn = useIsLoggedIn();
    const redirecturl = useSearchParams().get("redirectUrl") || `${process.env.NEXT_PUBLIC_FRONTEND || ""}/`
    const mobileNo = useSearchParams().get("phone") || "";
    const otpFromBE = useSearchParams().get("otp") || "";
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const { timer, canResend, resetTimer } = useResendTimer(30);
    const { setAccess, setUserInfo } = useAuthActions();
    const { setCartItems } = useCartActions();
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        if (isLoggedIn && !firstTimeLogin) router.push(redirecturl.split(window.location.hostname)[1])
    }, [isLoggedIn, firstTimeLogin])


    const handleResend = async () => {
        try {
            setLoading(true);
            const otp = await requestOtp(mobileNo);
            router.push(`/otp?phone=${mobileNo}&otp=${otp}&redirectUrl=${encodeURIComponent(redirecturl)}`);
            notify({
                variant: 'success',
                title: 'OTP Sent',
                message: 'OTP has been resent successfully.',
            });

            resetTimer();
        } catch (err) {
            notify({
                variant: 'error',
                title: 'Error!',
                message: (err as Error)?.message || 'Failed to resend OTP.',
            });
        } finally {
            setLoading(false);
        }
    };

    // Guest cart merge on login (FEA001). Reads the persisted guest cart from the
    // store at call time, merges it into the server cart, then refreshes the store
    // from the authoritative server cart. A merge failure never blocks login (D3/R3).
    const mergeGuestCartOnLogin = async () => {
        const guestItems = useCartStore.getState().cartItems;
        if (!guestItems || guestItems.length === 0) return; // AC6
        if (mergeInFlight) return;
        mergeInFlight = true;
        try {
            await mergeGuestCartAction(guestItems); // POST /merge
            const serverItems = await getCartItemsAction(); // authoritative merged cart
            setCartItems(serverItems ?? []); // AC4: replace guest cart with server cart
        } catch {
            notify({
                variant: 'error',
                title: 'Cart sync failed',
                message: 'We could not sync your cart. Your saved items are still on this device.',
            });
            // Do NOT rethrow — login must not be blocked by a merge failure (D3/R3).
        } finally {
            mergeInFlight = false;
        }
    };

    const handleOtpScreenClick = async () => {
        try {
            let deviceId = localStorage.getItem("deviceId");
            if (!deviceId) {
                localStorage.setItem("deviceId", crypto.randomUUID());
                deviceId = localStorage.getItem("deviceId")!;
            }
            const { firstTimeLogin, userInfo, ...access } = await apiFetch<VerifyOtpResponse>(`/auth-service/public/verify-otp`, {
                method: "POST",
                body: { phone: mobileNo, otp, deviceId },
            });
            setFirstTimeLogin(firstTimeLogin);
            setAccess(access);
            setUserInfo(userInfo);

            // FEA001: merge the guest cart immediately after OTP verification, for
            // BOTH the first-time-login (/setup-account) and normal-redirect paths (D3).
            // Awaited so the merge runs while the auth cookie context is alive and
            // before navigation (R3); failures are swallowed inside the helper.
            await mergeGuestCartOnLogin();

            notify({
                variant: 'success',
                title: 'Success!',
                message: 'OTP verified successfully.'
            })
            if (firstTimeLogin)
                router.push(`/setup-account?redirectUrl=${encodeURIComponent(redirecturl)}`);
            else
                router.push(redirecturl.split(window.location.hostname)[1])
        }
        catch (err) {
            notify({
                variant: 'error',
                title: 'Error!',
                message: (err as Error)?.message || 'Invalid OTP. Please try again.'
            })
        }
    }

    return (

        <Box maw={500} mx={"auto"} mt={'20vh'} px={16}>
            <Stack gap={32}  >
                <Stack w={"100%"} align="center" gap={12} ta='center'>
                    <IconDeviceMobileMessage size={96} />
                    <Title order={2} mt={28}>Verify OTP</Title>
                    <Box display={'inline'} pos={'relative'}>
                        <Text size="13px" c="dimmed" fw={500} lts={0.4} lh={1.4} w='80%' display={'inline'}>
                            Verify your account with the OTP we just sent on phone number ending with {mobileNo.slice(-4)}&nbsp;
                        </Text>
                        <IconEdit display={'inline'}
                            color="var(--mantine-color-primaryDark-7)"
                            size={18}
                            style={{ cursor: 'pointer', position: 'absolute', bottom: 5 }}
                            onClick={() => router.push(`/login?phone=${mobileNo}&redirectUrl=${encodeURIComponent(redirecturl)}`)} />
                    </Box>
                </Stack>
                <Stack align="center" gap={24}>
                    <PinInput value={otp} onChange={setOtp} type={/^[0-9]*$/} inputType="tel" inputMode="numeric" length={6} />
                    <Stack w={'80%'} align="center" gap={8}>
                        <Button
                            disabled={loading || !otp || otp.length < 6}
                            loading={loading}
                            size="md"
                            fullWidth
                            color='primaryDark.7'
                            onClick={() => {
                                handleOtpScreenClick()
                            }}
                        >
                            Verify OTP
                        </Button>
                        <Button
                            variant="transparent"
                            w={'80%'}
                            color={canResend ? "primaryDark.7" : "gray"}
                            onClick={canResend ? handleResend : undefined}
                            style={{ cursor: canResend ? 'pointer' : 'not-allowed' }}
                        >
                            {canResend ? 'Resend OTP' : `Resend OTP in 00:${timer.toString().padStart(2, '0')}`}
                        </Button>
                    </Stack>
                    <Text size="sm">
                        <i>**Use <b>{otpFromBE}</b> as your verification code (Only for dev purpose)</i>
                    </Text>
                </Stack>
            </Stack>
        </Box >
    )
}

export default Otp;
