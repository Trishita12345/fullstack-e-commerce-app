import { Skeleton, Stack, Group, Divider } from "@mantine/core";

export default function UpdateVariantSkeleton() {
  return (
    <Stack gap="md" mt={"md"}>
      {/* Back to variants */}
      <Skeleton height={20} width={140} />

      {/* Page title */}
      <Skeleton height={36} width={260} />

      {/* Name label */}
      <Skeleton height={14} width={60} />

      {/* Name input */}
      <Skeleton height={38} radius="md" />

      {/* Manage attributes title */}
      <Skeleton height={28} width={200} mt="md" />

      <Divider />

      {/* Attribute rows */}
      {[1, 2].map((_, index) => (
        <Group key={index} align="center">
          <Skeleton
            height={38}
            w={{ base: "100%", md: "60%", lg: "40%" }}
            radius="md"
          />
          <Skeleton height={38} width={40} radius="sm" />
        </Group>
      ))}

      {/* Add new attribute */}
      <Skeleton height={40} width={180} radius="sm" />

      {/* Action buttons */}
      <Group mt="xl">
        <Skeleton height={44} width={120} radius="sm" />
        <Skeleton height={44} width={140} radius="sm" />
      </Group>
    </Stack>
  );
}
