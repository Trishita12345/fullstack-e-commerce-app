"use client";
import {
  Card,
  Grid,
  GridCol,
  Group,
  RadioIndicator,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { LoadingPrice } from "../(cart)/LoadingCart";
import { useViewportSize } from "@mantine/hooks";

const LoadingPayment = () => {
  const { width } = useViewportSize();
  return (
    <Grid>
      <GridCol
        pr={{ base: 0, lg: 24 }}
        span={{ base: 12, lg: 8 }}
        style={{
          borderRight: `${width < 1200 ? 0 : 1
            }px solid var(--mantine-color-gray-1)`,
        }}
      >
        <Stack my={24}>
          <Text size="lg" fw={600}>
            Select Mode of Payment
          </Text>
          <Card radius="md" shadow="md">
            <Group justify="space-between" ta={"center"}>
              <Skeleton height={18} width={18} />
              <Stack>
                <Skeleton height={24} width={200} />
                <Skeleton height={12} width={200} />
              </Stack>
              <Skeleton height={30} width={80} />
            </Group>
          </Card>
          <Card radius="md" shadow="md">
            <Group justify="space-between" ta={"center"}>
              <Skeleton height={18} width={18} />
              <Stack>
                <Skeleton height={24} width={200} />
                <Skeleton height={12} width={200} />
              </Stack>
              <Skeleton height={30} width={80} />
            </Group>
          </Card>

          <Skeleton height={34} width={"100%"} />
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
        <Stack my={16}>
          <LoadingPrice step={"payment"} />
        </Stack>
      </GridCol>
    </Grid>
  );
};

export default LoadingPayment;
