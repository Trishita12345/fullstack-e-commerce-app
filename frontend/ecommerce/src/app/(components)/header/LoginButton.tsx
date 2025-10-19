"use client";

import { Button } from "@mantine/core";
import { useContext, useEffect } from "react";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";

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
        <Button variant="subtle" onClick={() => logOut()}>
          Log out
        </Button>
      ) : (
        <Button variant="subtle" onClick={() => logIn()}>
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
