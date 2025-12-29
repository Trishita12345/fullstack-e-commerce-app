// app/actions/category.ts
"use server";

import { Category, SelectOptionType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { revalidatePath } from "next/cache";

export async function addCategory(values: Category) {
  await apiFetch("/category/add", {
    method: "POST",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function editCategory(id: string, values: Category) {
  await apiFetch(`/category/edit/${id}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath("/admin/categories");
}

export async function parentCaregories() {
  await apiFetch<SelectOptionType[]>("/category/get-parent-categories");
}
