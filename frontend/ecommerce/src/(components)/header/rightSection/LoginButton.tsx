"use client";

import { Button, Popover, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";
import PopoverContent from "./PopoverContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/auth";

const LoginButton = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [session, setSession] = useState<Session | null>(null);

  const { data: session, isPending } = authClient.useSession();

  const handleSocialLogIn = async () => {
    // setLoading(true);
    debugger;
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      // setLoading(false);
      notifications.show({
        title: "Login Failed",
        message: error.message,
        color: "red",
      });
    } else {
      // setLoading(false);
      notifications.show({
        title: "Welcome Again",
        message: "Welcome again please checkout and enlighten your room",
        color: "green",
      });
      // setSession(data);
    }
  };
  if (isPending) {
    return <div></div>;
  }
  return (
    <>
      {session?.user ? (
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button
              c="black.9"
              py={2}
              px={{ base: 0, xs: 12 }}
              style={{
                fontSize: "13px",
                "--button-hover": "var(--mantine-color-black-1)",
              }}
              radius="xs"
              variant="subtle"
              leftSection={<FontAwesomeIcon icon={faUser} />}
            >
              <Text size="xs" fw={600} visibleFrom="xs">
                {`${en.hi}, ${session.user.name}!`}
              </Text>
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <PopoverContent />
          </Popover.Dropdown>
        </Popover>
      ) : (
        <Button
          c="black.9"
          py={2}
          px={{ base: 0, xs: 12 }}
          style={{
            fontSize: "13px",
            "--button-hover": "var(--mantine-color-black-1)",
          }}
          radius="xs"
          variant="subtle"
          leftSection={<FontAwesomeIcon icon={faUser} />}
          onClick={handleSocialLogIn}
        >
          <Text size="xs" fw={600} visibleFrom="xs">
            {en.login}
          </Text>
        </Button>
      )}
    </>
  );
};

export default LoginButton;
