'use server';

import type { CartItemDTO, CartProductsDTO} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function updateCartAction(values: CartItemDTO) {
    await apiFetch<void>(`/cart-service/cart-items/update`, {
    method: "PUT",
    body: values,
  });
}

export async function removeFromCartAction(productItemId: string) {
     await apiFetch<void>(`/cart-service/cart-items/delete/${productItemId}`, { method: "DELETE" });
}

export async function getInitialCartDataAction(cartItems: CartItemDTO[]) {
     const data =  await apiFetch<CartProductsDTO>(
      "/product-service/public/products/cart-item-details",
      {
        method: "POST",
        body: cartItems.map((ci) => ci.productItemId),
         })
    return data;
}