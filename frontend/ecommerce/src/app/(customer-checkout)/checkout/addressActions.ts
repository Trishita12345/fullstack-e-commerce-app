"use server";

import type {
  AddressDTO,
  CartItemDTO,
  CartProductsDTO,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function addAddress(values: AddressDTO) {
  await apiFetch<void>(`/profile-service/address/add`, {
    method: "POST",
    body: values,
  });
}
export async function updateAddress(values: AddressDTO) {
  await apiFetch<void>(`/profile-service/address/${values.addressId}`, {
    method: "PUT",
    body: values,
  });
}
export async function deleteAddress(addressId: string) {
  await apiFetch<void>(`/profile-service/address/${addressId}`, {
    method: "DELETE",
  });
}

export async function getAddressById(addressId: string) {
  const data = await apiFetch<AddressDTO[]>(
    `/profile-service/address/${addressId}`,
  );
  return data;
}
