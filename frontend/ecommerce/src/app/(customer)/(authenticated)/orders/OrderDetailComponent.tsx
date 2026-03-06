import { OrderDetailsDTO } from "@/constants/types";
import { decodeSkuToken } from "@/utils/helperFunctions";
import { Box, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderDetailComponent = ({ order }: { order: OrderDetailsDTO }) => {
  const router = useRouter();
  return (
    <Box>
      <Group justify={"space-between"} mb={12}>
        <Stack gap={3}>
          <Text size="xs" c="black.7">
            Order ID:
          </Text>
          <Text fw={600} size="xs" c="black.7" lts={0.6}>
            {order.orderId}
          </Text>
        </Stack>
        <Text size="xs" c="black.7" lts={0.6}>
          {order.createdAt}
        </Text>
      </Group>
      <Paper bdrs={"8px"} pt={12} bd={"1px solid lightgrey"}>
        <Stack gap={4} px={16} pb={12}>
          <Title order={5}>{order.orderStatus}</Title>
          <Text size="sm" c="black.7">{`On ${order.updatedAt}`}</Text>
        </Stack>
        <Box
          py={8}
          px={{ base: 12, md: 20 }}
          bdrs={"8px"}
          style={{ borderTop: "1px solid lightgrey" }}
          bg={"white"}
        >
          {order.items.map((item, idx) => {
            const variants = decodeSkuToken(item.sku);
            return (
              <Stack
                key={item.orderItemId}
                my={14}
                gap={14}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  router.push(`/order/${order.orderId}/${item.orderItemId}`)
                }
              >
                <Box
                  display={"flex"}
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    display={"flex"}
                    style={{
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={item.productImg}
                      alt="G"
                      height={60}
                      width={60}
                      style={{ borderRadius: "6px" }}
                    />
                    <Stack gap={4}>
                      <Text size="sm">{item.productName}</Text>
                      <Text size="xs" c="black.8">
                        {variants.join(" | ")}
                      </Text>
                    </Stack>
                  </Box>
                  <IconChevronRight
                    color="var(--mantine-color-black-4)"
                    size={18}
                  />
                </Box>
                {idx < order.items.length - 1 && (
                  <Divider variant="dashed" color="black.1" />
                )}
              </Stack>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetailComponent;
