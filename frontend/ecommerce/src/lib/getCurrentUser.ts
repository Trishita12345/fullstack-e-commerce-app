'use server';
import { cache } from "react";
import { serverApiFetch } from "./serverApiFetch";
import { User } from "@/constants/types";
import { notifications } from '@mantine/notifications';

export const getCurrentUser = cache(async () => {
    return await serverApiFetch<User>("/profile-service/userinfo", {
        tags: ["getCurrentUser"]
    });
});
