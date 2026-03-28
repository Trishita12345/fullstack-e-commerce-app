'use client'
import { useSession } from "@/utils/store/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (!session?.user) router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`);
    }, [session?.user])
    return (
        <></>
    )
}