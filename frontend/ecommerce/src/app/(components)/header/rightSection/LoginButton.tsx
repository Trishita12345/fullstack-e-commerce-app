"use client";

import { Button, Popover, Text } from "@mantine/core";
import { useContext, useEffect } from "react";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";
import PopoverContent from "./PopoverContent";

const LoginButton = () => {
  const { token, tokenData, logOut, logIn, loginInProgress } =
    useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    if (token) {
      console.log(tokenData);
    }
  }, [token]);
  return (
    <>
      {token ? (
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
                {`${en.hi}, ${tokenData?.given_name}!`}
              </Text>
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <PopoverContent onLogout={logOut} />
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
          onClick={() => logIn()}
        >
          <Text size="xs" fw={600} visibleFrom="xs">
            {en.account}
          </Text>
        </Button>
      )}
    </>
  );
};

export default LoginButton;
