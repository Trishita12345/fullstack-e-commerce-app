"use client";

import { Button } from "@mantine/core";
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
    <>
      <Button
        c="black.9"
        style={{
          "--button-hover": "var(--mantine-color-black-1)",
        }}
        radius="xs"
        variant="subtle"
        leftSection={<FontAwesomeIcon icon={faUser} />}
        onClick={() => (token ? logOut() : logIn())}
      >
        {token ? `${en.hi}, ${tokenData?.given_name}!` : en.account}
      </Button>
    </>
  );
};

export default LoginButton;
