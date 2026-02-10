"use server";

import type {
  CartItemDbDTO,
  CartItemDTO,
  CartProductsDTO,
  PriceSummaryRequest,
  PriceSummaryResponse,
  TotalPriceFromProductDTO,
  TotalPriceFromProductDTORequest,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";
import { CouponTypeDTO } from "./[step]/(cart)/CouponBox";

export async function updateCartAction(values: CartItemDbDTO) {
  await apiFetch<void>(`/cart-service/cart-items/update`, {
    method: "PUT",
    body: values,
  });
}
export async function updateOverallCartAction(values: CartItemDTO[]) {
  await apiFetch<void>(`/cart-service/cart-items/update-all`, {
    method: "PUT",
    body: values,
  });
}

export async function removeFromCartAction(productItemId: string) {
  await apiFetch<void>(`/cart-service/cart-items/delete/${productItemId}`, {
    method: "DELETE",
  });
}

export async function getCartItemsAction() {
  const data = await apiFetch<CartItemDTO[]>("/cart-service/cart-items");
  return data;
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
export async function getTotalProductPrice(body: PriceSummaryRequest) {
  const data = await apiFetch<PriceSummaryResponse>(
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
    const data = await apiFetch<CouponTypeDTO[]>(
      "/offer-service/public/all-coupons",
    );
    return data;
  } catch {}
}
