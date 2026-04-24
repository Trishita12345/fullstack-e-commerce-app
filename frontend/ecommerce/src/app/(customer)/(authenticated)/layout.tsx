
import { getCurrentUser } from "@/lib/getCurrentUser";
import { unauthorized } from "next/navigation";

export default async function AuthenticatetdLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    if (!user) unauthorized();
    return (
        <>
            {children}
        </>
    );
}