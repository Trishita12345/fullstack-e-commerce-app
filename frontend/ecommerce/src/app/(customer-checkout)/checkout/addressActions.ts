"use server";

import type {
  AddressDTO,
  CartItemDTO,
  CartProductsDTO,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

// export async function updateCartAction(values: CartItemDTO) {
//   await apiFetch<void>(`/cart-service/cart-items/update`, {
//     method: "PUT",
//     body: values,
//   });
// }

// export async function removeFromCartAction(productItemId: string) {
//   await apiFetch<void>(`/cart-service/cart-items/delete/${productItemId}`, {
//     method: "DELETE",
//   });
// }

export async function getAllAddresses() {
  const data = await apiFetch<AddressDTO[]>("/profile-service/address/all");
  return data;
}
