"use client";
import {
  IconGauge,
  IconCategoryFilled,
  IconStack2Filled,
  IconBuildingWarehouse,
  IconGitBranch,
} from "@tabler/icons-react";
import { LinksGroup } from "../adminNavbarLinksGroup";
import { en } from "@/constants/en";

const mockdata = [
  {
    label: en.Dashboard,
    icon: IconGauge, link: "/dashboard"
  },
  {
    label: "Inventory",
    icon: IconBuildingWarehouse,
    initiallyOpened: true,
    links: [
      { label: en.Categories, icon: IconCategoryFilled, link: "/categories" },
      { label: "Variants", icon: IconGitBranch, link: "/variants" },
      { label: "Products", icon: IconStack2Filled, link: "/products" },
    ],
  },
];
const Links = () => (
  <>
    {mockdata.map((item, idx) => (
      <LinksGroup {...item} key={idx} />
    ))}
  </>
);

export default Links;
