import { Divider, Stack, Text } from "@mantine/core";

const GiftBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        GIFTING & PERSONALISATION
      </Text>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default GiftBox;
