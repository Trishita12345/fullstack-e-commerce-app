"use client";
import {
  IconGauge,
  IconCategoryFilled,
  IconNotes,
  IconStack2Filled,
  IconBuildingWarehouse,
} from "@tabler/icons-react";
import { LinksGroup } from "../adminNavbarLinksGroup";
import { en } from "@/constants/en";

const mockdata = [
  { label: en.Dashboard, icon: IconGauge, link: "/dashboard" },
  // { label: en.Categories, icon: IconCategoryFilled, link: "/categories" },
  // { label: en.Categories, icon: IconCategoryFilled, link: "/products" },
  {
    label: "Inventory",
    icon: IconBuildingWarehouse,
    initiallyOpened: true,
    links: [
      { label: en.Categories, icon: IconCategoryFilled, link: "/categories" },
      { label: "Products", icon: IconStack2Filled, link: "/products" },
    ],
  },
  // {
  //   label: "Releases",
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: "Upcoming releases", link: "/" },
  //     { label: "Previous releases", link: "/a" },
  //     { label: "Releases schedule", link: "/a" },
  //   ],
  // },
  // { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  // { label: "Contracts", icon: IconFileAnalytics },
  // { label: "Settings", icon: IconAdjustments },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/a" },
  //     { label: "Change password", link: "/a" },
  //     { label: "Recovery codes", link: "/a" },
  //   ],
  // },
];
const Links = () => (
  <>
    {mockdata.map((item) => (
      <LinksGroup {...item} key={item.label} />
    ))}
  </>
);

export default Links;
