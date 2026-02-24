"use client";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Indicator, Tooltip } from "@mantine/core";
import { en } from "@/constants/en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "@/utils/store/session";
import { getCartItemsAction } from "@/app/(customer-checkout)/checkout/cartActions";
const CartButton = () => {
  const session = useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { setCartItems } = useCartActions();

  const selectedCartItems = useCartItems().filter((item) => item.isSelected);
  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoggedIn) {
        const cartItemsFromDb = await getCartItemsAction();
        setCartItems(cartItemsFromDb);
      }
    };
    fetchCartItems();
  }, [isLoggedIn]);

  return (
    <Link href={"/checkout/cart"}>
      <Indicator
        inline
        label={selectedCartItems.length}
        size={16}
        color={"primaryDark.6"}
        processing={selectedCartItems.length > 0}
      >
        <Tooltip label={en.myCart}>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      </Indicator>
    </Link>
  );
};

export default CartButton;
