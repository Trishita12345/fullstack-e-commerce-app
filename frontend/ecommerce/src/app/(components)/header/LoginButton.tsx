"use client";

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
        <button onClick={() => logOut()}>Log out</button>
      ) : (
        <button onClick={() => logIn()}>Login</button>
      )}
    </>
  );
};

export default LoginButton;
