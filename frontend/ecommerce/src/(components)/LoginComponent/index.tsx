"use client";

import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useAddressActions } from "@/utils/store/address";
import { useSession, useAuthActions } from "@/utils/store/session";
import { Button, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import Image from "next/image";

export interface LoggedInProps {
  session: Session;
}
export interface LoggedOutProps {
  openLoginPopUp: () => void;
  closeLoginPopUp: () => void;
}

const LoginComponent = ({
  LoggedInComponent,
  NotLoggedInComponent,
}: {
  LoggedInComponent: any;
  NotLoggedInComponent: any;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();
  const { setSession } = useAuthActions();
  const { data } = authClient.useSession();
  const { getAllAddresses } = useAddressActions();

  const handleLogInWithGoogle = async () => {
    setTimeout(close, 300);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.href,
    });
    if (error) {
      notifications.show({
        title: "Login Failed",
        message: error.message,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (data?.user) {
      setSession(data);
      getAllAddresses();
    }
  }, [data]);
  return (
    <>
      {session?.user ? (
        <LoggedInComponent session={session} />
      ) : (
        <>
          <Modal
            centered
            opened={opened}
            onClose={close}
            styles={{
              body: {
                paddingBottom: "32px",
              },
            }}
          >
            <Stack gap={24}>
              <Stack w={"100%"} ta="center" gap={8}>
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
                {/*<Button
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
                </Button>*/}
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
          </Modal>
          <NotLoggedInComponent openLoginPopUp={open} closeLoginPopUp={close} />
        </>
      )}
    </>
  );
};

export default LoginComponent;
