"use server";

import { PlaceOrderReqDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function placeOrder(body: PlaceOrderReqDTO) {
  const data = await apiFetch<number>(`/order-service/place-order`, {
    method: "POST",
    body,
  });
  return data;
}
