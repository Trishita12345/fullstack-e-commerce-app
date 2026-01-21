"use server";

import type { CartItemDbDTO, CartProductsDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function updateCartAction(values: CartItemDbDTO) {
  await apiFetch<void>(`/cart-service/cart-items/update`, {
    method: "PUT",
    body: values,
  });
}

export async function removeFromCartAction(productItemId: string) {
  await apiFetch<void>(`/cart-service/cart-items/delete/${productItemId}`, {
    method: "DELETE",
  });
}

export async function getProductDetailsAction(cartItems: CartItemDbDTO[]) {
  const data = await apiFetch<CartProductsDTO>(
    "/product-service/public/products/cart-item-details",
    {
      method: "POST",
      body: cartItems.map((ci) => ci.productItemId),
    },
  );
  return data;
}

export async function moveFromCartToWishlisted(productItemId: string) {
  await apiFetch<void>(
    `/cart-service/wishlisted/move-to-wishlist/${productItemId}`,
    {
      method: "POST",
    },
  );
  revalidatePath("/wishlist");
}
