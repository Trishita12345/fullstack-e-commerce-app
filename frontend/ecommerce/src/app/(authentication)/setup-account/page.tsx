'use client';
import { useUserInfo } from "@/utils/store/auth";

import { Box, Stack, Title, Text, Button } from "@mantine/core";
import UpdateProfileForm from "@/app/(customer)/(authenticated)/my-profile/edit/UpdateProfileForm";
import { useRouter, useSearchParams } from "next/navigation";

const SetUpAccount = () => {
    const redirecturl = useSearchParams().get("redirectUrl") || `${process.env.NEXT_PUBLIC_FRONTEND || ""}/`;
    const userInfoData = useUserInfo();
    const router = useRouter();

    const handleSkip = () => router.push(redirecturl.split(process.env.NEXT_PUBLIC_FRONTEND!)[1])

    return (
        <Stack maw={500} mx={"auto"} mt={'10vh'} px={16}>
            <Stack w={"100%"} ta="center" gap={12} >
                <Title order={2} tt='capitalize'>Fill up your details</Title>
                <Text size="13px" c="dimmed" fw={500} lts={0.4} lh={1.4}>
                    We just need a few more details to set up your account and get you glowing with our handcrafted candles, calming scents, and cozy moments.
                </Text>
            </Stack>
            <Stack gap={12}>
                <UpdateProfileForm userInfodata={userInfoData} redirecturl={redirecturl} />
                <Text c={"primaryDark.7"} style={{ cursor: 'pointer' }} size='sm' fw={600} onClick={handleSkip}>Skip for now, I'll do it later</Text>
            </Stack>
        </Stack>
    )
}

export default SetUpAccount;