"use client";
import { IconGauge, IconCategoryFilled, IconNotes } from "@tabler/icons-react";
import { LinksGroup } from "../adminNavbarLinksGroup";
import { en } from "@/constants/en";

const mockdata = [
  { label: en.Dashboard, icon: IconGauge, link: "/dashboard" },
  { label: en.Categories, icon: IconCategoryFilled, link: "/categories" },
  // {
  //   label: "Market news",
  //   icon: IconNotes,
  //   initiallyOpened: true,
  //   links: [
  //     { label: "Overview", link: "/dashboard" },
  //     { label: "Forecasts", link: "/forecasts" },
  //     { label: "Outlook", link: "/a" },
  //     { label: "Real time", link: "/a" },
  //   ],
  // },
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
