import { InfoIcon } from "@/(components)/InfoIcon";
import { Button, Divider, Group, Stack, Text } from "@mantine/core";

const PriceDetailsBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" c="black.7" tt={"uppercase"} fw={600} lts={0.5}>
        Price Details (2 Items)
      </Text>
      <Stack gap={4}>
        <Group justify="space-between">
          <Text c={"black.7"} size="xs">Total MRP</Text>
          <Text fw={400} size="xs">₹24000.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="xs">Discount on MRP</Text>
          <Text c={"green"} fw={400} size="xs">- ₹2400.00</Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="xs">Coupon Discount</Text>
          <Text c={"green"} size="xs">- ₹2400.00</Text>
        </Group>
        <Group justify="space-between">
          <Group gap={4}><Text c={"black.7"} size="xs">Donation</Text><InfoIcon info="** Donation has been added as per choice you have selected above" /></Group>
          <Text size="xs">₹10.00</Text>
        </Group>
        <Group justify="space-between">
          <Group gap={4}><Text c={"black.7"} size="xs">Gift wrap charges</Text><InfoIcon info="** Gift charges has been added as you have selected above" /></Group>
          <Text size="xs">₹35.00</Text>
        </Group>
      </Stack>
      <Divider color="gray.1" mt={4} />
      <Group justify="space-between">
        <Text c={"black.7"} fw={700} size="sm">Total</Text>
        <Text fw={700} c={"black.7"} size="sm">₹19200.00</Text>
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
