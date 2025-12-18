// "use client";

import { Box, Button, Switch, Text } from "@mantine/core";
import Link from "next/link";
import LogoText from "../logo/LogoText";
import LoginButton from "../header/rightSection/LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { en } from "@/constants/en";

const AdminHeader = () => {
  return (
    <Box bg="gray.0" py={4}>
      <Box
        w={"90%"}
        mx="auto"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <LogoText />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
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
    </Box>
  );
};

export default AdminHeader;
