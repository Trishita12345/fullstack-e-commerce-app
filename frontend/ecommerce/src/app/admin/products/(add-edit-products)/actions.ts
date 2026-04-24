"use server";

import type { Product } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";

export async function addProduct(values: Product) {
  const { productId } = await serverApiFetch<Product>(`/product-service/product/add`, {
    method: "POST",
    body: values,
  });
  revalidatePath(`/admin/products`);
  return productId;
}

export async function editProduct(productId: string, values: Product) {
  await serverApiFetch(`/product-service/product/${productId}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath(`/admin/products`);
}
