import { Box } from "@mantine/core";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import LogoText from "../logo/LogoText";

const Header = () => {
  return (
    <Box
      bg="gray.0"
      py={8}
      px={{ base: 8, sm: 50, md: 100 }}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box display={"flex"} flex={3}>
        <LeftSection />
      </Box>
      <Box display={"flex"} flex={3} style={{ justifyContent: "center" }}>
        <LogoText />
      </Box>

      <Box display={"flex"} flex={3} style={{ justifyContent: "end" }}>
        <RightSection />
      </Box>
    </Box>
  );
};

export default Header;
