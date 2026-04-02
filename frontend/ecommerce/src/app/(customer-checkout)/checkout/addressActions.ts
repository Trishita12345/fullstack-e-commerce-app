"use server";

import type {
  AddressDTO,
} from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function addAddress(values: AddressDTO) {
  const address = await serverApiFetch<AddressDTO>(`/profile-service/address/add`, {
    method: "POST",
    body: values,
  });
  return address.addressId;
}
export async function updateAddress(values: AddressDTO) {
  await serverApiFetch<void>(`/profile-service/address/${values.addressId}`, {
    method: "PUT",
    body: values,
  });
}
export async function deleteAddress(addressId: string) {
  await serverApiFetch<void>(`/profile-service/address/${addressId}`, {
    method: "DELETE",
  });
}

export async function getAddressById(addressId: string) {
  const data = await serverApiFetch<AddressDTO[]>(
    `/profile-service/address/${addressId}`,
  );
  return data;
}
export async function getAllAddressesAction() {
  try {
    const data = await serverApiFetch<AddressDTO[]>("/profile-service/address/all");
    return data;
  } catch {}
}
