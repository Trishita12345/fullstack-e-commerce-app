'use server';
import { cache } from "react";
import { serverApiFetch } from "./serverApiFetch";
import { User } from "@/constants/types";

export const getCurrentUser = cache(async () => {
    return await serverApiFetch<User>("/profile-service/userinfo");
});
