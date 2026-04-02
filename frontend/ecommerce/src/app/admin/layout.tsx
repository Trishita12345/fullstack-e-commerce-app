import AdminHeader from "@/(components)/adminHeader";
import AdminSidebar from "@/(components)/adminSidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Box, Group } from "@mantine/core";
import { forbidden, unauthorized } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user === null) return unauthorized();
  // if (user.role !== "ADMIN") return forbidden();
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
