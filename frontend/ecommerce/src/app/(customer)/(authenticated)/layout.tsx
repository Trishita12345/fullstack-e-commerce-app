"use client"
import { useSession } from "@/utils/store/session";
import { unauthorized } from "next/navigation";

export default function AuthenticatetdLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = useSession();
    if (!session?.user?.id) return unauthorized();
    return (
        <>
            {children}
        </>
    );
}