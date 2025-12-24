import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const items = [
  { title: "Mantine", href: "#", active: true },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
];

export default function Breadcrumb() {
  return (
    <>
      <Breadcrumbs separator={<IconChevronRight size={14} />} mt="sm">
        {items.map((item) => (
          <>
            {item.active ? (
              <Link href={item.href} key={item.href}>
                <Text size="14px" c={"black"}>
                  {item.title}
                </Text>
              </Link>
            ) : (
              <Text size="14px" c={"dimmed"}>
                {item.title}
              </Text>
            )}
          </>
        ))}
      </Breadcrumbs>
    </>
  );
}
