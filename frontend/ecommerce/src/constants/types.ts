import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type NavItem = {
  label: string;
  href: string;
};
export type PopoverContentItemProps = {
  label: string;
  href: string;
  icon: IconProp;
};
