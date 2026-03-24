"use server";

import { saveUserDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function saveUser(body: saveUserDTO) {
  await apiFetch<String>(
      '/profile-service/userinfo',
      {
          method: 'POST',
          body
      }
  );
}