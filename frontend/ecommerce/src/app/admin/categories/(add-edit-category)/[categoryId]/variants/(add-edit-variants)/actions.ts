"use server";

import { Category } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";

export async function addVariant(categoryId: string, values: Category) {
  await serverApiFetch(`/product-service/variant/add/${categoryId}`, {
    method: "POST",
    body: values,
  });
  revalidatePath(`/admin/categories/${categoryId}/variants`);
}

export async function editVariant(
  categoryId: string,
  variantId: string,
  values: Category
) {
  await serverApiFetch(`/product-service/variant/${categoryId}/${variantId}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath(`/admin/categories/${categoryId}/variants`);
}
