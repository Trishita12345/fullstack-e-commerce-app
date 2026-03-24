"use server";

import { FullUser } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function updateUser(body: FullUser) {
  await apiFetch<FullUser>(
      '/profile-service/userinfo',
      {
          method: 'PUT',
          body
      }
  );
}
export async function getUser() {
    const res = await apiFetch<FullUser>('/profile-service/userinfo');
    return res;
}