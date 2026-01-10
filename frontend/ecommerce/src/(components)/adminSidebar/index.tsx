import { ScrollArea } from "@mantine/core";

import "./adminSidebar.css";
import Links from "./Links";

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
