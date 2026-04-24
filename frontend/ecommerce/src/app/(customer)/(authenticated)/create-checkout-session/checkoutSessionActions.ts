"use server";

import { OrderStatusPollingResponse } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function getOrderStatus(orderId: string) {
  const res = await serverApiFetch<OrderStatusPollingResponse>(
    `/order-service/get-order-status/${orderId}`,
    {
      method: "GET",
    },
  );
  return res;
}

export async function getMerchantKey(orderId: string) {
  const { key } = await serverApiFetch<{ key: string }>(
    `/order-service/${orderId}/merchant-key`,
    {
      method: "GET",
    },
  );
  return key;
}

export async function cancelOrder(orderId: string) {
  await serverApiFetch<{ message: string }>(
    `/order-service/abandon-order-status/${orderId}`,
    {
      method: "POST",
    },
  );
}
