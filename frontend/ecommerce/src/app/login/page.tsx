'use client';
import LogoText from "@/(components)/logo/LogoText";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/utils/store/session";
import { Stack, Title, Button, Text, Box, Grid, GridCol, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCandle } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
    const redirecturl = useSearchParams().get("redirectUrl") || "/";
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session?.user) router.push(redirecturl.split(window.location.hostname)[1])
    }, [session?.user])

    const handleLogInWithGoogle = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: redirecturl.split(window.location.hostname)[1],
        });
        if (error) {
            notifications.show({
                title: "Login Failed",
                message: error.message,
                color: "red",
            });
        }
    };
    return (
        <Grid >
            <GridCol span={6} style={{ backgroundColor: 'var(--mantine-color-primary-1)' }} h={'100vh'} visibleFrom="sm">
                <Center h={'100vh'} style={{ flexDirection: 'column' }}>
                    <LogoText fontSize="1.6rem" />
                </Center>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }} h={'100vh'}>
                <Stack gap={32} maw={500} mx={"auto"} mt={'30vh'} px={16} >
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
                    <Stack>
                        {/* <Button
                            color="primaryDark.7"
                            variant="outline"
                            leftSection={
                                <Image
                                    src="/assets/facebookIcon.svg"
                                    alt="F"
                                    height={20}
                                    width={20}
                                />
                            }
                        >
                            Sign In With Facebook
                        </Button> */}
                        <Button
                            color="primaryDark.7"
                            variant="outline"
                            onClick={handleLogInWithGoogle}
                            leftSection={
                                <Image
                                    src="/assets/googleIcon.svg"
                                    alt="G"
                                    height={20}
                                    width={20}
                                />
                            }
                        >
                            Sign In With Google
                        </Button>
                    </Stack>
                </Stack>
            </GridCol>
        </Grid>
    )
}

export default Login;