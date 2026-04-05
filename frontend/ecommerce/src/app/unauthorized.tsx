'use client'

import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import { useIsLoggedIn } from "@/utils/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
    const router = useRouter();
    const { isLoggedIn } = useCurrentUser();

    useEffect(() => {
        if (!isLoggedIn) router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`);
    }, [isLoggedIn])
    return (
        <>unauthorized</>
    )
}