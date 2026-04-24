"use server";

import {ProductVariant } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";

export async function addProductVariant(productId: string, values: ProductVariant) {
  await serverApiFetch(`/product-service/productItem/add/${productId}`, {
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
  await serverApiFetch(`/product-service/productItem/${productVariantId}`, {
    method: "PATCH",
    body: values,
  });
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductVariant(
  productVariantId: string
) {
  await serverApiFetch<void>(`/product-service/productItem/${productVariantId}`, {
        method: "DELETE"
      })
    revalidatePath(`/admin/products/${productVariantId}`)
}

export async function generateProductSKU(
  productId: string,
  variants: Record<string,string> = {}
): Promise<string> {
  const { sku } = await serverApiFetch<{sku: string}>(`/product-service/productItem/${productId}/generate-sku`, {
    method: "POST",
    body: variants
  })
  return sku;
}
