"use server";

import { OrderStatusPollingResponse } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function getOrderStatus(orderId: string) {
  const res = await apiFetch<OrderStatusPollingResponse>(
    `/order-service/get-order-status/${orderId}`,
    {
      method: "GET",
    },
  );
  return res;
}

export async function getMerchantKey(orderId: string) {
  const { key } = await apiFetch<{ key: string }>(
    `/order-service/${orderId}/merchant-key`,
    {
      method: "GET",
    },
  );
  return key;
}

export async function cancelOrder(orderId: string) {
  await apiFetch<{ message: string }>(
    `/order-service/abandon-order-status/${orderId}`,
    {
      method: "POST",
    },
  );
}
