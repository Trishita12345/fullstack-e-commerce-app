"use client";
import { en } from "@/constants/en";
import { PopoverContentItemProps, User } from "@/constants/types";
import {
  faGear,
  faClockRotateLeft,
  faHouse,
  faArrowLeft,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Text } from "@mantine/core";
import PopoverContentItems from "./PopoverContentItems";
import { useCartActions } from "@/utils/store/cart";
import { useAddressActions } from "@/utils/store/address";
import { apiFetch } from "@/lib/apiFetch";
import { useAccess, useAuthActions } from "@/utils/store/auth";
import { usePathname } from "next/navigation";

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
  const { clearCartData } = useCartActions();
  const { clearAddressData } = useAddressActions();
  const { setUserInfo, setAccess } = useAuthActions();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await apiFetch(`/auth-service/public/logout`);
      clearCartData();
      clearAddressData();
      setUserInfo(undefined);
      setAccess(undefined);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const access = useAccess();
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
      {access?.role === "ADMIN" && (
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
