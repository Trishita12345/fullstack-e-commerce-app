import { Button, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconGiftFilled } from "@tabler/icons-react";

const GiftBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        GIFTING & PERSONALISATION
      </Text>
      <Card bg={"primary.0"}>
        <Group align="center">
          <IconGiftFilled color="#FF3F6E" />
          <Stack gap={8} w={"70%"}>
            <Text size="xs" fw={700} c="black.8">
              Buying for a Loved One?
            </Text>
            <Text size="xs" c="black.7">
              Gift Packaging and personalised message on card, Only for ₹35
            </Text>
            <Text
              size="xs"
              fw={600}
              c="primaryDark.7"
              tt={"uppercase"}
              style={{ cursor: "pointer" }}
            >
              Add Gift Package
            </Text>
          </Stack>
        </Group>
      </Card>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default GiftBox;
