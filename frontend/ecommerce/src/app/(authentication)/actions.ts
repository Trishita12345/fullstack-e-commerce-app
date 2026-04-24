"use server";

import { serverApiFetch } from "@/lib/serverApiFetch";

export async function requestOtp(phone: string) {
    const otp = await serverApiFetch(`/auth-service/public/request-otp`, {
      method: "POST",
      body: { phone },
    });
  return otp;
}
export async function logout() {
      await serverApiFetch(`/auth-service/public/logout`);

}