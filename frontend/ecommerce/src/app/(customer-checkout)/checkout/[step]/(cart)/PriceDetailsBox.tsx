import { Button, Divider, Group, Stack, Text } from "@mantine/core";

const PriceDetailsBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" c="black.7" tt={"uppercase"} fw={600} lts={0.5}>
        Price Details (2 Items)
      </Text>
      <Stack gap={4}>
        <Group justify="space-between">
          <Text c={"black.7"} size="sm">Total MRP</Text>
          <Text fw={600} size="sm">₹24000.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="sm">Discount on MRP</Text>
          <Text c={"green"} fw={600} size="sm">- ₹2400.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="sm">Coupon Discount</Text>
          <Text c={"red"} size="sm">-₹2400.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="sm">Donation ***</Text>
          <Text c={"pink"} fw={600} size="sm">+ ₹10.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="sm">Gift wrap charges</Text>
          <Text c={"pink"} fw={600} size="sm">+ ₹35.00</Text>
        </Group>
      </Stack>
      <Divider color="gray.1" mt={4} />
      <Group justify="space-between">
        <Text c={"black.7"} fw={700} size="sm">Total</Text>
        <Text fw={900} size="sm">₹19200.00</Text>
      </Group>
      <Button color="primaryDark.7" size="md">
        <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
          place order
        </Text>
      </Button>
    </Stack>
  );
};

export default PriceDetailsBox;
