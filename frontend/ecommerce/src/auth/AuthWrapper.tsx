"use client";

import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "@/auth/authConfig";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider authConfig={authConfig}>{children}</AuthProvider>;
}
