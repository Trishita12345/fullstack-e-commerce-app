"use server";

import type {
  CartItemDbDTO,
  CartItemDTO,
  CartProductsDTO,
  PriceSummaryRequest,
  PriceSummaryResponse
} from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";
import { CouponTypeDTO } from "./[step]/(cart)/CouponBox";

export async function updateCartAction(values: CartItemDbDTO) {
  await serverApiFetch<void>(`/cart-service/cart-items/update`, {
    method: "PUT",
    body: values,
  });
}
export async function updateOverallCartAction(values: CartItemDTO[]) {
  await serverApiFetch<void>(`/cart-service/cart-items/update-all`, {
    method: "PUT",
    body: values,
  });
}

export async function removeFromCartAction(productItemId: string) {
  await serverApiFetch<void>(`/cart-service/cart-items/delete/${productItemId}`, {
    method: "DELETE",
  });
}

export async function getCartItemsAction() {
  const data = await serverApiFetch<CartItemDTO[]>("/cart-service/cart-items");
  return data;
}

export async function getProductDetailsAction(cartItems: CartItemDbDTO[]) {
  const data = await serverApiFetch<CartProductsDTO>(
    "/product-service/public/products/cart-item-details",
    {
      method: "POST",
      body: cartItems.map((ci) => ci.productItemId),
    },
  );
  return data;
}

export async function moveFromCartToWishlisted(productItemId: string) {
  await serverApiFetch<void>(
    `/cart-service/wishlisted/move-to-wishlist/${productItemId}`,
    {
      method: "POST",
    },
  );
  revalidatePath("/wishlist");
}
export async function getTotalProductPrice(body: PriceSummaryRequest) {
  const data = await serverApiFetch<PriceSummaryResponse>(
    "/order-service/public/price-summary",
    {
      method: "POST",
      body,
    },
  );
  return data;
}

export async function getAllCouponsAction() {
  try {
    const data = await serverApiFetch<CouponTypeDTO[]>(
      "/offer-service/public/all-coupons",
    );
    return data;
  } catch {}
}
