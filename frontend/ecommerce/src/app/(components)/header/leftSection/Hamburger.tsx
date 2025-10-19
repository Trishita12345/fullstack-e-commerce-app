"use client";
import {
  faArrowRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Stack, Box, Text } from "@mantine/core";
import { NavItem } from "@/constants/types";
import LogoText from "../../logo/LogoText";
import Link from "next/link";

type HamburgerProps = {
  navData: NavItem[];
};
const Hamburger = ({ navData }: HamburgerProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <FontAwesomeIcon icon={faBars} cursor={"pointer"} onClick={open} />
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"sm"}
        styles={{
          title: {
            width: "100%",
          },
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
        {navData.map((item: NavItem) => (
          <Link href={item.href}>
            <Box
              px={10}
              style={{
                borderBottom: `1px solid ${"var(--mantine-color-black-2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 50,
              }}
              tt="uppercase"
            >
              <Text size="xs">{item.label}</Text>
              <FontAwesomeIcon icon={faArrowRight} size="xs" />
            </Box>
          </Link>
        ))}
      </Drawer>
    </>
  );
};

export default Hamburger;
