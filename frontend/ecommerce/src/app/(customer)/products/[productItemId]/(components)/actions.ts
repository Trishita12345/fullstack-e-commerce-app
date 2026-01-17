'use server';

import type { CartItemDTO, PdpCartDataDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

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
    const { isWishlisted } = await Promise.resolve({ isWishlisted: true });
    //   apiFetch<PdpCartDataDTO>(
    //     `/cart-service/cart-items/check/${productItemId}`,
    //     {
    //       cache: "force-cache",
    //       revalidate: 3600,
    //       tags: ["cart"],
    //     }
    // );
    return isWishlisted;
}