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

export async function mergeGuestCartAction(items: CartItemDTO[]) {
  // Map the persisted Zustand guest cart shape -> backend CartItemRequestDTO shape.
  // We intentionally omit updatedQuantity (not part of CartItemRequestDTO) and
  // never send a userId (resolved server-side from the gateway header, AC7).
  const payload = items.map((ci) => ({
    productItemId: ci.productItemId,
    quantity: ci.quantity,
    priceSnapshot: ci.priceSnapshot,
    isSelected: ci.isSelected ?? true,
  }));
  await serverApiFetch<void>("/cart-service/cart-items/merge", {
    method: "POST",
    body: payload,
  });
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
