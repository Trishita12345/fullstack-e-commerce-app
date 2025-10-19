"use client";

import { Button, Text } from "@mantine/core";
import { useContext, useEffect } from "react";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";

const LoginButton = () => {
  const { token, tokenData, logOut, logIn, loginInProgress } =
    useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    if (token) {
      console.log(tokenData);
    }
  }, [token]);
  return (
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
      onClick={() => (token ? logOut() : logIn())}
    >
      <Text size="xs" fw={600} visibleFrom="xs">
        {token ? `${en.hi}, ${tokenData?.given_name}!` : en.account}
      </Text>
    </Button>
  );
};

export default LoginButton;
