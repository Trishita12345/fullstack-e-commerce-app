"use server";

import { PlaceOrderReqDTO } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function placeOrder(body: PlaceOrderReqDTO) {
  const orderId = await serverApiFetch<string>(`/order-service/place-order`, {
    method: "POST",
    body,
  });
  return orderId;
}
