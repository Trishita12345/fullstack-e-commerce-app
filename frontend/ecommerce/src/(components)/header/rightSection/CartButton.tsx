"use client";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Indicator, Tooltip } from "@mantine/core";
import { en } from "@/constants/en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import Link from "next/link";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
const CartButton = () => {
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { getInitialCartData } = useCartActions();

  const cartItems = useCartItems();
  useEffect(() => {
    if (isLoggedIn) {
      getInitialCartData();
    }
  }, [isLoggedIn]);
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
