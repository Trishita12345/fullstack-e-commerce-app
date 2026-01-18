'use server';

import type { CartItemDTO, PdpCartDataDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addOrUpdateCartAction(values: CartItemDTO, type: 'add' | 'update') {
  if (type === 'add') {
    await apiFetch<void>('/cart-service/cart-items/add', {
      method: "POST",
      body: values,
    });
  } else {
    await apiFetch<void>(`/cart-service/cart-items/update`, {
      method: "PUT",
      body: values,
    });
  }

}


export async function getPdpCartData(productItemId: string) {
  const { noOfItemsInCart } =
    await apiFetch<PdpCartDataDTO>(
      `/cart-service/cart-items/check/${productItemId}`,
    );
  return noOfItemsInCart;
}


export async function getIsWishListed(productItemId: string) {
  const { isWishlisted } = await apiFetch<{ isWishlisted: boolean }>(
    `/cart-service/wishlisted/check/${productItemId}`,
  );
  return isWishlisted;
}

export async function addToWishListed(productItemId: string) {
  await apiFetch<void>(
    `/cart-service/wishlisted/add/${productItemId}`,
    {
      method: "POST"
    }
  );
  revalidatePath('/wishlist')
}

export async function removeFromWishListed(productItemId: string) {
  await apiFetch<void>(
    `/cart-service/wishlisted/delete/${productItemId}`,
    {
      method: "DELETE",
    }
  );
  revalidatePath('/wishlist')
}

export async function moveFromWishListedToCart(values: CartItemDTO) {
  await apiFetch<void>(
    `/cart-service/wishlisted/move-to-cart`,
    {
      method: "POST",
      body: values
    }
  );
  revalidatePath('/wishlist')
}