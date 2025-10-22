import { Box } from "@mantine/core";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import LogoText from "../logo/LogoText";

const Header = () => {
  return (
    <Box bg="gray.0" py={8}>
      <Box
        w={"90%"}
        mx="auto"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box display={"flex"} flex={3}>
          <LeftSection />
        </Box>
        <Box
          display={"flex"}
          flex={2}
          style={{ justifyContent: "center" }}
          hidden
          visibleFrom="md"
        >
          <LogoText />
        </Box>

        <Box display={"flex"} flex={3} style={{ justifyContent: "end" }}>
          <RightSection />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
