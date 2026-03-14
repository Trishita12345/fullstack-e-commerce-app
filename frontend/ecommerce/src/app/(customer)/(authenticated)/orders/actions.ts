"use server";

import { OrderDetailsDTO, Page } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

export async function getOrders(
  page: number = 0,
): Promise<Page<OrderDetailsDTO>> {
  const res = await apiFetch<Page<OrderDetailsDTO>>(
    `/order-service/orders/page?page=${page}`,
  );
  return res;
}
