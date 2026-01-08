// app/actions/category.ts
"use server";

import { AddEditCategoryResponceType, SelectOptionType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addCategory(values: AddEditCategoryResponceType) {
  await apiFetch("/category/add", {
    method: "POST",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function editCategory(id: string, values: AddEditCategoryResponceType) {
  await apiFetch(`/category/edit/${id}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function parentCaregories() {
  await apiFetch<SelectOptionType[]>("/category/get-parent-categories");
}
