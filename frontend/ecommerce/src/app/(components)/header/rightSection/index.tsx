import { Box, Tooltip } from "@mantine/core";
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { en } from "@/constants/en";

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
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ cursor: "pointer", paddingRight: 12 }}
      />
      <Tooltip label={en.myWishlist}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ cursor: "pointer", paddingRight: 12 }}
        />
      </Tooltip>

      <Tooltip label={en.myCart}>
        <FontAwesomeIcon icon={faCartShopping} style={{ cursor: "pointer" }} />
      </Tooltip>
    </Box>
  );
};

export default RightSection;
