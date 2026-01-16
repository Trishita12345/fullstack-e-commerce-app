import { Button, Divider, Stack, Text } from "@mantine/core";

const PriceDetailsBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        Price Details(2 Items)
      </Text>
      <Divider color="gray.1" mt={4} />
      <Button color="primaryDark.7" size="md">
        <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
          place order
        </Text>
      </Button>
    </Stack>
  );
};

export default PriceDetailsBox;
