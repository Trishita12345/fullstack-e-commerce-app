'use client'

import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import { useIsLoggedIn } from "@/utils/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
    const router = useRouter();
    const { loading, isLoggedIn } = useCurrentUser();

    useEffect(() => {
        if (!isLoggedIn && !loading) router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`);
    }, [isLoggedIn, loading])
    return (
        <>unauthorized</>
    )
}