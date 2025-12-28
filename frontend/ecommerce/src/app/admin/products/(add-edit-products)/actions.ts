"use server";

import type { Product } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addProduct(values: Product) {
  const { productId } = await apiFetch<Product>(`/product/add`, {
    method: "POST",
    body: values,
  });
  revalidatePath(`/admin/products`);
  return productId;
}

export async function editProduct(productId: string, values: Product) {
  await apiFetch(`/product/${productId}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath(`/admin/products`);
}
