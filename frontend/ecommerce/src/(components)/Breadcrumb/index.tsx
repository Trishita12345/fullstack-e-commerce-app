import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { IconBackslash } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment } from "react";

// const items = [
//   { title: "Mantine", href: "#", active: true },
//   { title: "Mantine hooks", href: "#" },
//   { title: "use-id", href: "#" },
// ];
interface BreadcrumbProps {
  items: {
    title: string;
    href: string;
    active?: boolean;
  }[];
}
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <>
      <Breadcrumbs
        separator={"\\"}
        mb={28}
        style={{ fontSize: 12, textTransform: "uppercase" }}
      >
        {items.map((item) => (
          <Fragment key={item.title}>
            {item.active ? (
              <Text
                tt={"uppercase"}
                fw={600}
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "300px",
                }}
                size="9px"
                c="dimmed"
                lts={1}
                lh={2}
              >
                {item.title}
              </Text>
            ) : (
              <Link href={item.href} key={item.href}>
                <Text
                  tt={"uppercase"}
                  fw={600}
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "300px",
                  }}
                  size="9px"
                  c="black"
                  lts={1}
                  lh={2}
                >
                  {item.title}
                </Text>
              </Link>
            )}
          </Fragment>
        ))}
      </Breadcrumbs>
    </>
  );
}
