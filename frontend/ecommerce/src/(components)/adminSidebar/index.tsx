import { Box, ScrollArea } from "@mantine/core";

import "./adminSidebar.css";
import Links from "./Links";
import LogoText from "../logo/LogoText";

export default function AdminSidebar() {
  return (
    <nav className={"navbar"}>
      <ScrollArea className={"links"}>
        <div className={"linksInner"}>
          <Links />
        </div>
      </ScrollArea>
    </nav>
  );
}
