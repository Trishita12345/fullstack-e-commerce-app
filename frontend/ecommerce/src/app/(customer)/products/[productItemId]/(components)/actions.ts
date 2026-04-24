"use server";

import type { CartItemDbDTO, PdpCartDataDTO } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";

export async function addOrUpdateCartAction(
  values: CartItemDbDTO,
  type: "add" | "update",
) {
  if (type === "add") {
    await serverApiFetch<void>("/cart-service/cart-items/add", {
      method: "POST",
      body: values,
    });
  } else {
    await serverApiFetch<void>(`/cart-service/cart-items/update`, {
      method: "PUT",
      body: values,
    });
  }
}

export async function getPdpCartData(productItemId: string) {
  const { noOfItemsInCart } = await serverApiFetch<PdpCartDataDTO>(
    `/cart-service/cart-items/check/${productItemId}`,
  );
  return noOfItemsInCart;
}

export async function getIsWishListed(productItemId: string) {
  const { isWishlisted } = await serverApiFetch<{ isWishlisted: boolean }>(
    `/cart-service/wishlisted/check/${productItemId}`,
  );
  return isWishlisted;
}

export async function addToWishListed(productItemId: string) {
  await serverApiFetch<void>(`/cart-service/wishlisted/add/${productItemId}`, {
    method: "POST",
  });
  revalidatePath("/wishlist");
}

export async function removeFromWishListed(productItemId: string) {
  await serverApiFetch<void>(`/cart-service/wishlisted/delete/${productItemId}`, {
    method: "DELETE",
  });
  revalidatePath("/wishlist");
}
