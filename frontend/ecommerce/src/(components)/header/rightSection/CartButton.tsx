"use client";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Indicator, Tooltip } from "@mantine/core";
import { en } from "@/constants/en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartItems } from "@/utils/store/cart";
import Link from "next/link";
const CartButton = () => {
  const cartItems = useCartItems();
  return (
    <Link href={"/checkout/cart"}>
      {cartItems.length ? (
        <Indicator
          inline
          label={cartItems.length}
          size={16}
          color={"primaryDark.6"}
          processing
        >
          <Tooltip label={en.myCart}>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Indicator>
      ) : (
        <Tooltip label={en.myCart}>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}
    </Link>
  );
};

export default CartButton;
