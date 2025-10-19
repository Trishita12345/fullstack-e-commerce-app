import { en } from "@/constants/en";
import { NavItem } from "@/constants/types";
import { Box, Text } from "@mantine/core";
import LeftNavItem from "./LeftNavItem";

const navData: NavItem[] = [
  {
    label: en.store,
    href: "/store",
  },
  {
    label: en.about,
    href: "/about-us",
  },
  {
    label: en.readStories,
    href: "/#read-stories",
  },
  {
    label: en.customCandles,
    href: "/#custom-candles",
  },
];
const LeftSection = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      {navData.map((navItem: NavItem) => (
        <LeftNavItem key={navItem.label} navItem={navItem} />
      ))}
    </Box>
  );
};

export default LeftSection;
