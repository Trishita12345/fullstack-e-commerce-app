"use server";

import { Category, ProductVariant } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { generate5DigitNumber, generateProductKey, normalizeText, normalizeUnit, UNIT_PATTERN, VariantMap } from "@/utils/helperFunctions";
import { revalidatePath } from "next/cache";

export async function addProductVariant(productId: string, values: ProductVariant) {
  await apiFetch(`/productItem/add/${productId}`, {
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
  await apiFetch(`/productItem/${productVariantId}`, {
    method: "PATCH",
    body: values,
  });
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductVariant(
  productVariantId: string
) {
  await apiFetch<void>(`/productItem/${productVariantId}`, {
        method: "DELETE"
      })
    revalidatePath(`/admin/products/${productVariantId}`)
}

export async function generateProductSKU(
  productId: string,
  variants: VariantMap = {}
): Promise<string> {
  const { sku } = await apiFetch<{sku: string}>(`/productItem/${productId}/generate-sku`, {
    method: "POST",
    body: variants
  })
  return sku;
}
