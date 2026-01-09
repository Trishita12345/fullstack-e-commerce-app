"use client";

import { NavItem } from "@/constants/types";
import { Text } from "@mantine/core";
import Link from "next/link";

type LeftNavItem = {
  navItem: NavItem;
};
const LeftNavItem = ({ navItem }: LeftNavItem) => {
  const feBaseUrl = process.env.NEXT_PUBLIC_FRONTEND;
  return (
    <Text
      tt={"uppercase"}
      fw={600}
      style={{ cursor: "pointer" }}
      lts={1}
      size="10px"
    >
      <Link href={`${feBaseUrl}${navItem.href}`}>{navItem.label}</Link>
    </Text>
  );
};

export default LeftNavItem;
