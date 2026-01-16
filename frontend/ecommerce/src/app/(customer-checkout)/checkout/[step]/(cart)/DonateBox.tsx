import { Divider, Stack, Text } from "@mantine/core";

const DonateBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        Support transformative social work in India
      </Text>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default DonateBox;
