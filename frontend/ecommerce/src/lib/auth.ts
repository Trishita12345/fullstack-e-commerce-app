import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt, oidcProvider } from "better-auth/plugins";
import "dotenv/config";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOGGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  cors: {
    enabled: true,
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
  plugins: [
    jwt({
      jwt: {
        audience: "http://localhost:8081",
      },
      jwks: {
        keyPairConfig: {
          alg: "RS256",
        },
      },
    }),
    oidcProvider({
      useJWTPlugin: false,
      getAdditionalUserInfoClaim: (user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }),
      loginPage: "/sign-in", // path to the login page
      allowDynamicClientRegistration: true,
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "CUSTOMER",
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3001",
    "https://oauth.pstmn.io/v1/callback",
    "http://localhost:8081",
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
