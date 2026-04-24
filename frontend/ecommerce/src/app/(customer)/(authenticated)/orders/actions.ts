"use server";

import { OrderDetailsDTO, Page } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";

export async function getOrders(
  page: number = 0,
): Promise<Page<OrderDetailsDTO>> {
  const res = await serverApiFetch<Page<OrderDetailsDTO>>(
    `/order-service/orders/page?page=${page}`,
  );
  return res;
}
