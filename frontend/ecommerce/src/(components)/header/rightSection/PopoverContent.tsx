import { en } from "@/constants/en";
import { PopoverContentItemProps } from "@/constants/types";
import {
  faGear,
  faClockRotateLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Text } from "@mantine/core";
import PopoverContentItems from "./PopoverContentItems";
import { useContext } from "react";
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";

const PopoverItems: PopoverContentItemProps[] = [
  {
    label: en.orderHistory,
    href: "/order-history",
    icon: faClockRotateLeft,
  },
  {
    label: en.manageProfile,
    href: `${process.env.NEXT_PUBLIC_KEYCLOAK}/realms/ecommerce/account/`,
    icon: faGear,
  },
  {
    label: en.savedAddesses,
    href: "/manage-profile/#addesses",
    icon: faHouse,
  },
];
const PopoverContent = () => {
  const { tokenData, logOut } = useContext<IAuthContext>(AuthContext);
  return (
    <Box>
      <Text
        hiddenFrom="xs"
        size="xs"
        fw={600}
        mb={12}
        mt={4}
      >{`${en.welcome}, ${tokenData?.given_name}!`}</Text>
      {PopoverItems.map((item: PopoverContentItemProps) => (
        <PopoverContentItems
          href={item.href}
          icon={item.icon}
          label={item.label}
        />
      ))}
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
        onClick={() => logOut()}
      >
        {en.signout}
      </Button>
    </Box>
  );
};

export default PopoverContent;
