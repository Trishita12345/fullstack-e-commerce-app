import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [jwtClient(), inferAdditionalFields<typeof auth>(), nextCookies()],
});
