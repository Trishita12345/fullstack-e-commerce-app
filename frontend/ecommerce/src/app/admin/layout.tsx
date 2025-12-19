import AdminHeader from "@/(components)/adminHeader";
import AdminSidebar from "@/(components)/adminSidebar";
import LoginButton from "@/(components)/header/rightSection/LoginButton";
import { en } from "@/constants/en";
import { getServerSession } from "@/lib/get-server-auth";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Stack } from "@mantine/core";
import Link from "next/link";
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
      <Box
        style={{
          display: "flex",
        }}
      >
        <AdminSidebar />
        <Stack w="100%">
          <AdminHeader />
          <Box px={16}>{children}</Box>
        </Stack>
      </Box>
    </>
  );
}
