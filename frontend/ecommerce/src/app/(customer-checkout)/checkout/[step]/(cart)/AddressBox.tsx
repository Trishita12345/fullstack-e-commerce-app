import { Box, Button, Group, Stack, Text } from "@mantine/core";

const AddressBox = () => {
  return (
    <Group
      bd={"1px solid gray.1"}
      p={16}
      bdrs={4}
      bg={"primary.0"}
      justify="space-between"
    >
      <Stack gap={4}>
        <Text size="xs">
          Deliver to: <b>Trishita Majumder</b>
        </Text>
        <Text size="xs">
          Lad colive PG , Outer Ring Road, Green Glen Layout, Bellandur,
          Bangalore
        </Text>
      </Stack>
      <Button variant="outline" color={"primaryDark.7"}>
        <Text size="xs" lts={0.8} fw={500}>
          CHANGE ADDRESS
        </Text>
      </Button>
    </Group>
  );
};

export default AddressBox;
