'use client';
import LogoText from "@/(components)/logo/LogoText";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";

import { Stack, Title, Button, Text, Box, Grid, GridCol, Center, PinInput, TextInput, Checkbox, Group } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestOtp } from "../actions";
import { notify } from "@/utils/helperFunctions";
import { apiFetch } from "@/lib/apiFetch";
import { IconDeviceMobileMessage, IconEdit, IconPencil } from "@tabler/icons-react";

const Login = () => {
    const redirecturl = useSearchParams().get("redirectUrl") || "/"
    const mobileNo = useSearchParams().get("phone") || "";
    const router = useRouter();
    const { isLoggedIn } = useCurrentUser();
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

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

    useEffect(() => {
        if (isLoggedIn) router.push(redirecturl.split(window.location.hostname)[1])
    }, [isLoggedIn])

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
            await apiFetch(`/auth-service/public/verify-otp`, {
                method: "POST",
                body: { phone: mobileNo, otp, deviceId },
            });
            notify({
                variant: 'success',
                title: 'Success!',
                message: 'OTP verified successfully.'
            })
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