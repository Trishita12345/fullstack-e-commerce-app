"use client";

import { Box, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AdminSidebar from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import LogoText from "../logo/LogoText";

export const MobileSideBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box hiddenFrom="md">
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        styles={{
          inner: { width: "320px", height: "100%" },
          title: { width: "-webkit-fill-available" },
        }}
        title={
          <Box
            p={10}
            style={{
              borderBottom: `1px solid ${"var(--mantine-color-black-2)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LogoText />
            <FontAwesomeIcon
              icon={faXmark}
              cursor={"pointer"}
              onClick={close}
            />
          </Box>
        }
      >
        <AdminSidebar />
      </Drawer>
      <FontAwesomeIcon icon={faBars} cursor={"pointer"} onClick={open} />
    </Box>
  );
};
