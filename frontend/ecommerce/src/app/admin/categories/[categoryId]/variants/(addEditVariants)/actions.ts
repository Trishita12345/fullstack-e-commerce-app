"use server";

import { Category } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addVariant(categoryId: string, values: Category) {
  await apiFetch(`/variant/add/${categoryId}`, {
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
  await apiFetch(`/variant/${categoryId}/${variantId}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath(`/admin/categories/${categoryId}/variants`);
}
