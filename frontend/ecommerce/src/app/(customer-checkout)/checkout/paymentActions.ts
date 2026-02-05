"use server";

import { apiFetch } from "@/lib/apiFetch";

export async function placeOrder() {
  await apiFetch<void>(`/order-service/place-order`, {
    method: "POST",
  });
}
