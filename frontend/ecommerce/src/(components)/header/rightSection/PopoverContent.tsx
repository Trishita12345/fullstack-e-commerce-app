"use client";
import { en } from "@/constants/en";
import { PopoverContentItemProps } from "@/constants/types";
import {
  faGear,
  faClockRotateLeft,
  faHouse,
  faArrowLeft,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Text } from "@mantine/core";
import PopoverContentItems from "./PopoverContentItems";
import { authClient } from "@/lib/auth-client";
import { redirect, usePathname } from "next/navigation";
import { User } from "@/lib/auth";

const PopoverItems: PopoverContentItemProps[] = [
  {
    label: en.orderHistory,
    href: "/order-history",
    icon: faClockRotateLeft,
  },
  {
    label: en.manageProfile,
    href: `/my-profile`,
    icon: faGear,
  },
  {
    label: en.savedAddesses,
    href: "/manage-profile/#addesses",
    icon: faHouse,
  },
];
const PopoverContent = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const handleLogout = async () => {
    await authClient.signOut();
    redirect("/");
  };
  return (
    <Box>
      <Text
        hiddenFrom="xs"
        size="xs"
        fw={600}
        mb={12}
        mt={4}
      >{`${en.hi}, ${user.name}!`}</Text>
      {PopoverItems.map((item: PopoverContentItemProps) => (
        <PopoverContentItems
          href={item.href}
          icon={item.icon}
          label={item.label}
          key={item.label}
        />
      ))}
      {user.role === "SELLER" && (
        <>
          {pathname.includes("/admin") ? (
            <PopoverContentItems
              href={"/"}
              icon={faArrowLeft}
              label={en.backToCustomer}
            />
          ) : (
            <PopoverContentItems
              href={"/admin/dashboard"}
              icon={faWarehouse}
              label={en.goToSeller}
            />
          )}
        </>
      )}
      <Button
        c={"white"}
        tt={"uppercase"}
        color={"var(--mantine-color-primaryDark-6)"}
        w={"100%"}
        mt={16}
        style={{
          height: "28px",
          fontSize: "0.6rem",
          letterSpacing: 2.5,
          "--button-hover": "var(--mantine-color-primaryDark-9)",
        }}
        onClick={handleLogout}
      >
        {en.signout}
      </Button>
    </Box>
  );
};

export default PopoverContent;
