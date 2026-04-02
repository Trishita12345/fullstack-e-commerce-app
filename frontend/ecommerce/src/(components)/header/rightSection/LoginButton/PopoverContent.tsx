"use client";
import { en } from "@/constants/en";
import { PopoverContentItemProps, User } from "@/constants/types";
import {
  faGear,
  faClockRotateLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Text } from "@mantine/core";
import PopoverContentItems from "./PopoverContentItems";
import { redirect, usePathname } from "next/navigation";
import { useCartActions } from "@/utils/store/cart";
import { useAddressActions } from "@/utils/store/address";
import { logout } from "@/app/login/actions";
import { apiFetch } from "@/lib/apiFetch";
import { useRouter } from "next/navigation";

const PopoverItems: PopoverContentItemProps[] = [
  {
    label: en.orderHistory,
    href: "/orders",
    icon: faClockRotateLeft,
  },
  {
    label: en.manageProfile,
    href: `/my-profile`,
    icon: faGear,
  },
  {
    label: en.savedAddesses,
    href: "/saved-addresses",
    icon: faHouse,
  },
];
const PopoverContent = ({ user }: { user: User }) => {
  const router = useRouter();
  const { clearCartData } = useCartActions();
  const { clearAddressData } = useAddressActions();

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await apiFetch(`/auth-service/public/logout`);
      clearCartData();
      clearAddressData();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box>
      <Text
        hiddenFrom="xs"
        size="xs"
        fw={600}
        mb={12}
        mt={4}
      >{`${en.hi}, ${user.fullName || 'User'}!`}</Text>
      {PopoverItems.map((item: PopoverContentItemProps) => (
        <PopoverContentItems
          href={item.href}
          icon={item.icon}
          label={item.label}
          key={item.label}
        />
      ))}
      {/* {user.role === "ADMIN" && (
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
      )} */}
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
