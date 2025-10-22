import { en } from "@/constants/en";
import { NavItem } from "@/constants/types";
import { Box } from "@mantine/core";
import LeftNavItem from "./LeftNavItem";
import LogoText from "../../logo/LogoText";
import Hamburger from "./Hamburger";

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
    <>
      <Box
        hiddenFrom="md"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Hamburger navData={navData} />
        <LogoText />
      </Box>
      <Box
        visibleFrom="md"
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
    </>
  );
};

export default LeftSection;
