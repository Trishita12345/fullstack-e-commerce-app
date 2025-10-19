import { en } from "@/constants/en";
import { PopoverContentItemProps } from "@/constants/types";
import {
  faGear,
  faClockRotateLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mantine/core";
import PopoverContentItems from "./PopoverContentItems";

const PopoverItems: PopoverContentItemProps[] = [
  {
    label: en.orderHistory,
    href: "/order-history",
    icon: faClockRotateLeft,
  },
  {
    label: en.manageProfile,
    href: "/manage-profile",
    icon: faGear,
  },
  {
    label: en.savedAddesses,
    href: "/manage-profile/#addesses",
    icon: faHouse,
  },
];
const PopoverContent = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Box>
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
        onClick={() => onLogout()}
      >
        {en.signout}
      </Button>
    </Box>
  );
};

export default PopoverContent;
