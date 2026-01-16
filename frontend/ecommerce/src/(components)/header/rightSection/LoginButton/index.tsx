"use client";

import { Button, Popover, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";
import PopoverContent from "./PopoverContent";
import { authClient } from "@/lib/auth-client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useCartActions, useCartItems } from "@/utils/store/cart";

const LoginButton = () => {
  const { data: session, isPending } = authClient.useSession();

  const handleSocialLogIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      notifications.show({
        title: "Login Failed",
        message: error.message,
        color: "red",
      });
    }
  };

  if (isPending) {
    return (
      <Button
        c="black.9"
        py={2}
        px={{ base: 0, xs: 12 }}
        style={{
          fontSize: "13px",
          cursor: "default",
        }}
        radius="xs"
        variant="transparent"
      >
        <Text size="xs" visibleFrom="xs">
          Logging in...
        </Text>
      </Button>
    );
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
              rightSection={<FontAwesomeIcon icon={faChevronDown} size="sm" />}
            >
              <Text size="xs" fw={600} visibleFrom="xs">
                {`${en.hi}, ${session.user.name}!`}
              </Text>
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <PopoverContent user={session.user} />
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
