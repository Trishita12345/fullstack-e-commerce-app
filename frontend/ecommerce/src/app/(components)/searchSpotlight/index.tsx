"use client";
import { en } from "@/constants/en";
import {
  faArrowTrendUp,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";

const defaultActions: SpotlightActionData[] = [
  //   {
  //     id: "home",
  //     label: "Home",
  //     description: "Get to home page",
  //     onClick: () => console.log("Home"),
  //     leftSection: <IconHome size={24} stroke={1.5} />,
  //   },
  {
    id: "newlyAdded",
    label: en.newlyAddedItems,
    description: en.mostLovedItemsDesc,
    onClick: () => console.log("Documentation"),
    leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
  },
  {
    id: "mostLoved",
    label: en.mostLovedItems,
    description: en.mostLovedItemsDesc,
    onClick: () => console.log("Dashboard"),
    leftSection: <FontAwesomeIcon icon={faHeart} size="lg" />,
  },
];

function SearchSpotlight() {
  const [actions, setActions] = useState<any>(defaultActions);
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 2000);
  return (
    <>
      <FontAwesomeIcon
        onClick={spotlight.open}
        icon={faMagnifyingGlass}
        style={{ cursor: "pointer", paddingRight: 12 }}
      />
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: "Search...",
        }}
        onChange={(event: any) => setValue(event.target.value)}
      />
    </>
  );
}

export default SearchSpotlight;
