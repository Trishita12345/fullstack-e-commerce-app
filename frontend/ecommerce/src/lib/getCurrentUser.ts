'use server';
import { cache } from "react";
import { serverApiFetch } from "./serverApiFetch";
import { User } from "@/constants/types";

export const getCurrentUser = cache(async () => {
    console.log("Fetching current user from server...");
    return await serverApiFetch<User>("/profile-service/userinfo", {
        tags: ["getCurrentUser"]
    });
});
