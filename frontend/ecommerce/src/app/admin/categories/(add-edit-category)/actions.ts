// app/actions/category.ts
"use server";

import { AddEditCategoryResponseType, SelectOptionType } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { revalidatePath } from "next/cache";

export async function addCategory(values: AddEditCategoryResponseType) {
  await serverApiFetch("/product-service/category/add", {
    method: "POST",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function editCategory(id: string, values: AddEditCategoryResponseType) {
  await serverApiFetch(`/product-service/category/edit/${id}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function parentCaregories() {
  await serverApiFetch<SelectOptionType[]>("/product-service/category/get-parent-categories");
}
