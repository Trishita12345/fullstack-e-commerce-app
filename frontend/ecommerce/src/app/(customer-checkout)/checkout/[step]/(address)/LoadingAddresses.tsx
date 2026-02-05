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
import { useViewportSize } from "@mantine/hooks";
import { LoadingPrice } from "../(cart)/LoadingCart";
const LoadingAddressCard = () => (
  <Card radius="md" shadow="md">
    <Group align="baseline" gap={16}>
      <RadioIndicator color={"primaryDark.7"} />
      <Stack w={{ base: "90%", md: "93%" }}>
        <Group justify="space-between">
          <Group>
            <Skeleton height={18} width={100} />
            <Skeleton height={18} width={40} />
          </Group>
          <Skeleton height={18} width={70} />
        </Group>
        <Skeleton height={18} width={330} />
        <Skeleton height={18} width={250} />
        <Group>
          <Skeleton height={18} width={40} />
          <Skeleton height={18} width={40} />
        </Group>
      </Stack>
    </Group>
  </Card>
);
const LoadingAddresses = () => {
  const { width } = useViewportSize();
  return (
    <Grid>
      <GridCol
        pr={{ base: 0, lg: 24 }}
        span={{ base: 12, lg: 8 }}
        style={{
          borderRight: `${
            width < 1200 ? 0 : 1
          }px solid var(--mantine-color-gray-1)`,
        }}
      >
        <Stack my={16} gap={18}>
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Select Delivery Address
            </Text>
            <Skeleton height={18} width={30} />
          </Group>
          <Text size="10px" c={"dimmed"} fw={600} tt={"uppercase"} lts={0.7}>
            Default address
          </Text>
          <LoadingAddressCard />
          <Text size="10px" c={"dimmed"} fw={600} tt={"uppercase"} lts={0.7}>
            Other address
          </Text>
          <LoadingAddressCard />
          <LoadingAddressCard />
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
        <Stack my={16}>
          <LoadingPrice step={"address"} />
        </Stack>
      </GridCol>
    </Grid>
  );
};

export default LoadingAddresses;
