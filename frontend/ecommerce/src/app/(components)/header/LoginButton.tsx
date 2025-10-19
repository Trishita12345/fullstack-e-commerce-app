"use client";

import { Button } from "@mantine/core";
import { useContext, useEffect } from "react";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

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
        <Button
          leftSection={<FontAwesomeIcon icon={faUser} />}
          variant="subtle"
          onClick={() => logIn()}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
