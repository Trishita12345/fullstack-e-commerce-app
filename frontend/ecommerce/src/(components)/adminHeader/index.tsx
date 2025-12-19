import { Box, Button, Text } from "@mantine/core";
import Link from "next/link";
import LoginButton from "../header/rightSection/LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { en } from "@/constants/en";

const AdminHeader = () => {
  return (
    <Box bg={"gray.0"} h="58px">
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          paddingRight: 16,
        }}
      >
        <Link href="/">
          <Button
            c="black.9"
            px={{ base: 0, xs: 12 }}
            style={{
              fontSize: "13px",
              "--button-hover": "var(--mantine-color-black-1)",
            }}
            radius="xs"
            variant="subtle"
            leftSection={<FontAwesomeIcon icon={faStore} />}
          >
            <Text size="xs" fw={600} visibleFrom="xs">
              {en.backToStore}
            </Text>
          </Button>
        </Link>
        <p style={{ color: "var(--mantine-color-black-2)" }}>|</p>
        <LoginButton />
      </Box>
    </Box>
  );
};

export default AdminHeader;
