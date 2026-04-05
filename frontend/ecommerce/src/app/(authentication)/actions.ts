"use server";

import { serverApiFetch } from "@/lib/serverApiFetch";
import { cookies } from "next/headers";

export async function requestOtp(phone: string) {
    await serverApiFetch(`/auth-service/public/request-otp`, {
      method: "POST",
      body: { phone },
  });
}
export async function logout() {
      await serverApiFetch(`/auth-service/public/logout`);

}