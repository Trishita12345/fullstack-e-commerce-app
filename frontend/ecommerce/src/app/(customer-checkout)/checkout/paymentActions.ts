"use server";

import { PlaceOrderReqDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function placeOrder(body: PlaceOrderReqDTO) {
  const orderId = await apiFetch<string>(`/order-service/place-order`, {
    method: "POST",
    body,
  });
  return orderId;
}
