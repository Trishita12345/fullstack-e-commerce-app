"use server";

import { Category, ProductVariant } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
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
