"use client";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { LinksGroup } from "../adminNavbarLinksGroup";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Market news",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/overview" },
      { label: "Forecasts", link: "/forecasts" },
      { label: "Outlook", link: "/a" },
      { label: "Real time", link: "/a" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/a" },
      { label: "Releases schedule", link: "/a" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/a" },
      { label: "Change password", link: "/a" },
      { label: "Recovery codes", link: "/a" },
    ],
  },
];
const Links = () => (
  <>
    {mockdata.map((item) => (
      <LinksGroup {...item} key={item.label} />
    ))}
  </>
);

export default Links;
