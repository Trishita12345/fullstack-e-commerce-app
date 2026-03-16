// import { apiFetch } from "@/lib/apiFetch";
// import { orderListingResponse } from "./data";
// import { OrderDetailsDTO, Page } from "@/constants/types";

// interface PageProps {
//   searchParams: {
//     page?: string;
//   };
// }
// export default async function Orders({ searchParams }: PageProps) {
//   const { page: pageParam } = await searchParams;

//   const page = Number(pageParam ?? 1) - 1;
//   //   const orderListingResponse = await apiFetch<Page<OrderDetailsDTO>>(
//   //     `/order-service/orders/page?page=${page}`,
//   //   );
//   return <>Orders</>;
// }
"use client";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { Paper, Box, Text, Loader, Stack, Divider } from "@mantine/core";
import { apiFetch } from "@/lib/apiFetch";
import { OrderDetailsDTO, Page } from "@/constants/types";
import OrderDetailComponent from "./OrderDetailComponent";
import { getOrders } from "./actions";

export default function InfiniteOrders() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [orders, setOrders] = useState<OrderDetailsDTO[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);


  const fetchOrders = async () => {
    if (loading || last) return;

    setLoading(true);
    const data = await apiFetch<Page<OrderDetailsDTO>>(
      `/order-service/orders/page?page=${page}`,
    );
    console.log("data: ", data);
    setOrders((prev) => [...prev, ...data.content]);
    setLast(data.last);
    setPage((prev) => prev + 1);

    setLoading(false);
  };

  // initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  // trigger next page when sentinel visible
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchOrders();
    }
  }, [entry]);

  return (
    <Paper
      ref={containerRef}
      h={"100vh"}
      p="md"
      style={{ overflowY: "scroll" }}
    >
      <Stack gap={24}>
        {orders.map((order, idx) => (
          <Stack
            w={{ base: "95%", md: "75%", lg: "55%" }}
            mx="auto"
            gap={24}
            key={order.orderId}
          >
            <OrderDetailComponent key={order.orderId} order={order} />
            {idx !== orders.length - 1 && (
              <Divider size="sm" variant="dashed" color="black.1" />
            )}
          </Stack>
        ))}

        {/* sentinel element */}
        {!last && (
          <Box ref={ref} style={{ display: "flex", justifyContent: "center" }}>
            {loading && <Loader />}
          </Box>
        )}

        {last && (
          <Text ta="center" c="dimmed">
            No more orders
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
