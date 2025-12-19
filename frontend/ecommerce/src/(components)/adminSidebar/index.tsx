import { Box, ScrollArea } from "@mantine/core";

import "./adminSidebar.css";
import Links from "./Links";
import LogoText from "../logo/LogoText";

export default function AdminSidebar() {
  return (
    <nav className={"navbar"}>
      <Box className={"header"}>
        <LogoText />
      </Box>

      <ScrollArea className={"links"}>
        <div className={"linksInner"}>
          <Links />
        </div>
      </ScrollArea>
    </nav>
  );
}
