import { Badge, Box, Group } from "@mantine/core";
import LoginButton from "../header/rightSection/LoginButton";
import LogoText from "../logo/LogoText";
import { en } from "@/constants/en";

const AdminHeader = () => {
  return (
    <Box bg={"gray.0"}>
      <Box
        h="58px"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 16px",
        }}
      >
        <Group>
          <LogoText />
          <Badge color="primaryDark.7" size="sm">
            {en.SellerMode}
          </Badge>
        </Group>
        <LoginButton />
      </Box>
    </Box>
  );
};

export default AdminHeader;
