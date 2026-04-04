"use server";

import { User } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateUser(body: User) {
    await serverApiFetch<User>(
        '/profile-service/userinfo',
        {
            method: 'PUT',
            body
        }
    );
    revalidatePath("/my-profile");
    revalidateTag("getCurrentUser", 'max')
}
