"use server";

import { User } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function updateUser(body: User) {
  await serverApiFetch<User>(
      '/profile-service/userinfo',
      {
          method: 'PUT',
          body
      }
  );
}
