"use client";

import { CartItemDTO } from "@/constants/types";
import { useCartItems } from "@/utils/store/cart";

const Cart = () => {
  const cartItems: CartItemDTO[] = useCartItems();
  return (
    <ol>
      {cartItems.map((c) => (
        <li>
          {c.productItemId} - {c.priceSnapshot} - {c.quantity}
        </li>
      ))}
    </ol>
  );
};

export default Cart;
