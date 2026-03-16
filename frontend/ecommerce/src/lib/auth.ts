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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  cors: {
    enabled: true,
    origin: ["https://loomandlume.shop", "https://api.loomandlume.shop"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: "2h",
        issuer: "https://loomandlume.shop",
        audience: "https://api.loomandlume.shop",
      },
      jwks: {
        keyPairConfig: {
          alg: "RS256",
        },
      },
    }),
    oidcProvider({
      useJWTPlugin: true,
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
    // "http://localhost:3001",
    "https://oauth.pstmn.io/v1/callback",
    "https://api.loomandlume.shop",
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
