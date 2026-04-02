'use client';
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";

import { Stack, Title, Button, Text, Box, Grid, GridCol, Center, PinInput, TextInput, Checkbox, Group } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestOtp } from "./actions";
import { notify } from "@/utils/helperFunctions";

const TnC = () => {
    return (
        <Text size='xs' c="dimmed" lts={0.4} lh={1.4}>
            By continuing, I agree to the
            <Link href="/termsofuse" style={{ color: 'var(--mantine-color-primaryDark-7)', fontWeight: 600 }}>
                &nbsp;Terms of Use
            </Link>
            &nbsp;&
            <Link href="/privacypolicy" style={{ color: 'var(--mantine-color-primaryDark-7)', fontWeight: 600 }}>
                &nbsp;Privacy Policy
            </Link>
            &nbsp;and I am above 18 years old.
        </Text >)
}

const Login = () => {
    const redirecturl = useSearchParams().get("redirectUrl") || "/";
    const phone = useSearchParams().get("phone") || "";
    const router = useRouter();
    const { isLoggedIn } = useCurrentUser(); const [mobileNo, setMobileNo] = useState<string>(phone);
    const [mobileError, setMobileError] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) router.push(redirecturl.split(window.location.hostname)[1])
    }, [isLoggedIn])

    const handleMobileScreenClick = async () => {
        if (mobileNo.length < 10) {
            setMobileError(true);
            return;
        }
        setMobileError(false);
        try {
            setLoading(true);
            await requestOtp(mobileNo);
            router.push(`/login/otp?phone=${mobileNo}&redirectUrl=${encodeURIComponent(redirecturl)}`);
        } catch (error) {
            notify({
                variant: 'error',
                title: 'Error!',
                message: 'Failed to send OTP. Please try again.'
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box maw={500} mx={"auto"} mt={'30vh'} px={16}>
            <Stack gap={32}  >
                <Stack w={"100%"} ta="center" gap={12}>
                    <Title order={2}>Hello there!</Title>
                    <Text size="14px" fw={600} lts={0.6} lh={1.4}>
                        Welcome back to Loom & Lume
                    </Text>
                    <Text size="13px" c="dimmed" fw={500} lts={0.4} lh={1.4}>
                        Sign in to glow your space with handcrafted candles, calming
                        scents, and cozy moments.
                    </Text>
                </Stack>
                <Stack align="center" gap={24}>
                    <TextInput
                        size="md"
                        leftSection={
                            <Text size="16px" c="black">
                                +91
                            </Text>
                        }
                        placeholder="&nbsp;Enter mobile number"
                        value={mobileNo}
                        onChange={(event) => {
                            if (/^\d{0,10}$/.test(event.currentTarget.value) || event.currentTarget.value === "") {
                                setMobileNo(event.currentTarget.value)
                            }
                            if (/^\d{10}$/.test(event.currentTarget.value) || event.currentTarget.value === "") {
                                setMobileError(false);
                            }
                        }}
                        withAsterisk
                        w={'80%'}
                        max={9999999999}
                        error={mobileError && "Please enter a valid 10-digit mobile number"}
                    />
                    <Box display={'flex'} style={{ alignItems: 'center', gap: 16 }} w={'80%'}>
                        <Checkbox
                            styles={{ input: { cursor: 'pointer' } }}
                            style={{ cursor: 'pointer' }}
                            color="primaryDark.7"
                            checked={termsChecked}
                            onChange={(event) => setTermsChecked(event.currentTarget.checked)}
                        />
                        <TnC />
                    </Box>
                    <Button
                        disabled={loading || !termsChecked}
                        loading={loading}
                        w={'80%'}
                        size="md"
                        color='primaryDark.7'
                        onClick={() => {
                            handleMobileScreenClick()
                        }}
                    >
                        Continue
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Login;