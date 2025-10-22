import { TAuthConfig } from "react-oauth2-code-pkce";

export const authConfig: TAuthConfig = {
  clientId: "next-frontend",
  authorizationEndpoint:
    "http://localhost:8443/realms/ecommerce/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8443/realms/ecommerce/protocol/openid-connect/token",
  redirectUri: "http://localhost:3000",
  scope: "openid profile email offline_access roles",
  onRefreshTokenExpire: (event) => event.logIn(),
  autoLogin: false,
};
