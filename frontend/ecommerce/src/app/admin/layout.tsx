import AdminHeader from "@/(components)/adminHeader";
import AdminSidebar from "@/(components)/adminSidebar";
import { getServerSession } from "@/lib/get-server-auth";
import { Box, Group } from "@mantine/core";
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
      <Group align="start" gap={0}>
        <Box visibleFrom="md">
          <AdminSidebar />
        </Box>
        <Box px={28} flex={2}>
          {children}
        </Box>
      </Group>
    </>
  );
}
