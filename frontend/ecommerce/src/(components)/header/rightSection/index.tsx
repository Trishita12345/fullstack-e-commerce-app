import { Box, Tooltip } from "@mantine/core";
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";
import SearchSpotlight from "../../searchSpotlight";
import CartButton from "./CartButton";

const RightSection = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <LoginButton />
      <p style={{ paddingRight: 10, color: "var(--mantine-color-black-2)" }}>
        |
      </p>
      <SearchSpotlight />
      <Tooltip label={en.myWishlist}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ cursor: "pointer", paddingRight: 12 }}
        />
      </Tooltip>
      <CartButton />
    </Box>
  );
};

export default RightSection;
