"use client";

import { Button, Popover, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";
import PopoverContent from "./PopoverContent";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import LoginComponent, {
  LoggedInProps,
  LoggedOutProps,
} from "@/(components)/LoginComponent";

const LoggedIn = ({ user }: LoggedInProps) => (
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
          {`${en.hi}, ${user.fullName || 'User'}!`}
        </Text>
      </Button>
    </Popover.Target>
    <Popover.Dropdown>
      <PopoverContent user={user} />
    </Popover.Dropdown>
  </Popover>
);

const LoggedOut = ({ redirectToLogin }: LoggedOutProps) => (
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
    onClick={redirectToLogin}
  >
    <Text size="xs" fw={600} visibleFrom="xs">
      {en.login}
    </Text>
  </Button>
);

const LoginButton = () => {
  return (
    <LoginComponent
      LoggedInComponent={LoggedIn}
      NotLoggedInComponent={LoggedOut}
    />
  );
};

export default LoginButton;
