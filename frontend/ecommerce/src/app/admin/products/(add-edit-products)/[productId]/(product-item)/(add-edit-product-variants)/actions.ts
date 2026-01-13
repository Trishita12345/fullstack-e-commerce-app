"use server";

import {ProductVariant } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addProductVariant(productId: string, values: ProductVariant) {
  await apiFetch(`/product-service/productItem/add/${productId}`, {
    method: "POST",
    body: values,
  });
  revalidatePath(`/admin/products/${productId}`);
}

export async function editProductVariant(
  productId: string,
  productVariantId: string,
  values: ProductVariant
) {
  await apiFetch(`/product-service/productItem/${productVariantId}`, {
    method: "PATCH",
    body: values,
  });
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductVariant(
  productVariantId: string
) {
  await apiFetch<void>(`/product-service/productItem/${productVariantId}`, {
        method: "DELETE"
      })
    revalidatePath(`/admin/products/${productVariantId}`)
}

export async function generateProductSKU(
  productId: string,
  variants: Record<string,string> = {}
): Promise<string> {
  const { sku } = await apiFetch<{sku: string}>(`/product-service/productItem/${productId}/generate-sku`, {
    method: "POST",
    body: variants
  })
  return sku;
}
