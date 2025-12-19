"use client";
import { useState } from "react";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import "./NavbarLinksGroup.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const pathname = usePathname();
  const isActive = (link?: string) => link && pathname === `/admin${link}`;
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={"link"}
      href={`/admin${link.link}`}
      key={link.label}
      style={{
        backgroundColor: isActive(link.link)
          ? "var(--mantine-color-primaryDark-1)"
          : "",
        color: isActive(link.link) ? "var(--mantine-color-black-9)" : "",
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <Link href={link ? "/admin" + link : ""}>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={"control"}
          bg={!hasLinks && isActive(link) ? "primaryDark.1" : ""}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon
                variant="light"
                size={30}
                c="primaryDark.7"
                bg="primaryDark.0"
              >
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={"chevron"}
                stroke={1.5}
                size={16}
                style={{ transform: opened ? "rotate(-90deg)" : "none" }}
              />
            )}
          </Group>
        </UnstyledButton>
      </Link>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

// const mockdata = {
//   label: "Releases",
//   icon: IconCalendarStats,
//   links: [
//     { label: "Upcoming releases", link: "/" },
//     { label: "Previous releases", link: "/" },
//     { label: "Releases schedule", link: "/" },
//   ],
// };

// export function NavbarLinksGroup() {
//   return (
//     <Box mih={220} p="md">
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }
