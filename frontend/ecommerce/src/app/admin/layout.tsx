import AdminHeader from "@/(components)/adminHeader";
import { getServerSession } from "@/lib/get-server-auth";
import { forbidden } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || session.user.role !== "SELLER") return forbidden();
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
