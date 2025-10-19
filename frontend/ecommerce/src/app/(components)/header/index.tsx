import { Box } from "@mantine/core";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <Box bg="secondary.0" py={16} px={100}>
      <LoginButton />
    </Box>
  );
};

export default Header;
