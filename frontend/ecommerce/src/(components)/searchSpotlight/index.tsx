"use client";
import { en } from "@/constants/en";
import {
  faArrowTrendUp,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebouncedValue } from "@mantine/hooks";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultActions = (handleClick: (link: string) => void): SpotlightActionData[] => {
  return ([
    {
      id: "trending",
      label: 'Explore Trending Items',
      description: 'Check the trending items in our store',
      onClick: () => handleClick("/products?sortBy=trending&dir=desc"),
      leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
    },
    {
      id: "newlyAdded",
      label: en.newlyAddedItems,
      description: en.mostLovedItemsDesc,
      onClick: () => handleClick("/products?sortBy=createdAt&dir=desc"),
      leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
    },
    {
      id: "mostBought",
      label: 'Most Bought Items',
      description: 'Check the most bought items by our customers',
      onClick: () => handleClick("/products?sortBy=popularity&dir=desc"),
      leftSection: <FontAwesomeIcon icon={faHeart} size="lg" />,
    },
    {
      id: "address",
      label: 'My Address',
      description: 'View my address',
      onClick: () => handleClick("/address"),
      leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
    },
    {
      id: "orders",
      label: 'My Orders',
      description: 'View my orders',
      onClick: () => handleClick("/orders"),
      leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
    },
    {
      id: "profile",
      label: 'My Profile',
      description: 'View and edit your profile',
      onClick: () => handleClick("/my-profile"),
      leftSection: <FontAwesomeIcon icon={faArrowTrendUp} size="lg" />,
    },
    {
      id: "wishlist",
      label: 'My Wishlist',
      description: 'View my wishlist',
      onClick: () => handleClick("/wishlist"),
      leftSection: <FontAwesomeIcon icon={faHeart} size="lg" />,
    },
    {
      id: "cart",
      label: 'My Cart',
      description: 'View my cart',
      onClick: () => handleClick("/cart"),
      leftSection: <FontAwesomeIcon icon={faHeart} size="lg" />,
    },
  ])
};

function SearchSpotlight() {
  const [actions, setActions] = useState<SpotlightActionData[]>([]);
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 2000);
  const router = useRouter();

  useEffect(() => {
    if (debounced) { }
    else {
      setActions(defaultActions(handleClick));
    }
  }, [debounced]);

  const handleClick = (link: string) => {
    router.push(link)
  }
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
        // limit={3}
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: "Search...",
        }}
        onChange={(event) => {
          const { target } = event;
          setValue((target as unknown as { value: string }).value);
        }}
      />
    </>
  );
}

export default SearchSpotlight;
