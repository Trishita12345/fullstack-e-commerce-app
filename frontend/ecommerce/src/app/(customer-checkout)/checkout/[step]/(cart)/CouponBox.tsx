import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";

const CouponBox = () => {
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        COUPONS
      </Text>
      <Group justify="space-between">
        <Group gap={8}>
          <IconTag size={18} />
          <Text size="13px" fw={600}>
            Apply Coupons
          </Text>
        </Group>
        <Button variant="outline" color={"primaryDark.7"} size="xs">
          <Text size="xs" lts={0.8} fw={600}>
            APPLY
          </Text>
        </Button>
      </Group>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default CouponBox;
