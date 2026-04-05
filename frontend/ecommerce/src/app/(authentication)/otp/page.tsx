'use client';
import { useIsLoggedIn } from "@/utils/store/auth";

import { Stack, Title, Button, Text, Box, PinInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestOtp } from "../actions";
import { notify } from "@/utils/helperFunctions";
import { apiFetch } from "@/lib/apiFetch";
import { IconDeviceMobileMessage, IconEdit } from "@tabler/icons-react";
import { VerifyOtpResponse } from "@/constants/types";
import { useAuthActions } from "@/utils/store/auth";

const Login = () => {
    const isLoggedIn = useIsLoggedIn();
    const redirecturl = useSearchParams().get("redirectUrl") || `${process.env.NEXT_PUBLIC_FRONTEND || ""}/`
    const mobileNo = useSearchParams().get("phone") || "";
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const { setAccess, setUserInfo } = useAuthActions();
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        if (isLoggedIn && !firstTimeLogin) router.push(redirecturl.split(window.location.hostname)[1])
    }, [isLoggedIn, firstTimeLogin])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResend = async () => {
        try {
            setLoading(true);
            await requestOtp(mobileNo);

            notify({
                variant: 'success',
                title: 'OTP Sent',
                message: 'OTP has been resent successfully.',
            });

            setTimer(30);
            setCanResend(false);
        } catch {
            notify({
                variant: 'error',
                title: 'Error!',
                message: 'Failed to resend OTP.',
            });
        } finally {
            setLoading(false);
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
        catch {
            notify({
                variant: 'error',
                title: 'Error!',
                message: 'Invalid OTP. Please try again.'
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
                </Stack>
            </Stack>
        </Box >
    )
}

export default Login;