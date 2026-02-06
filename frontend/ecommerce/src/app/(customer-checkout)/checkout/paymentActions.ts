"use server";

import { PlaceOrderReqDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function placeOrder(body: PlaceOrderReqDTO) {
  await apiFetch<void>(`/order-service/place-order`, {
    method: "POST",
    body,
  });
}
