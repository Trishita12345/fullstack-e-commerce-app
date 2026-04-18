"use server";

import { User } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateUser(body: User) {
    const res = await serverApiFetch<User>(
        '/profile-service/userinfo',
        {
            method: 'PUT',
            body
        }
    );
    revalidatePath("/my-profile");
    return res;
}

export async function generateEmailOtp(email: string) {
    await serverApiFetch(`/profile-service/verify-email/generate-otp?email=${email}`);
}

export async function verifyEmailOtp(email: string, code: string) {
    await serverApiFetch(`/profile-service/verify-email/resend-otp?email=${email}&verificationCode=${code}`);
}
