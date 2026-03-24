import { Skeleton, Stack, Group, Box, Divider } from "@mantine/core";

function ProfileViewSkeleton() {
  return (
    <Stack maw={640} mx={"auto"} mt={16} gap={16} px={16}>
      
      {/* Header */}
      <Skeleton height={28} width={200} />
      <Divider />

      {/* Profile Image */}
      <Group justify="center">
        <Skeleton height={140} width={140} radius="xl" />
      </Group>

      {/* Details Section */}
      <Stack spacing="md" mt="md">
        
        {[
          "Full Name",
          "Email Id",
          "Phone",
          "Gender",
          "DOB",
        ].map((_, i) => (
          <Group key={i} justify="space-between">
            <Skeleton height={16} width={120} />
            <Skeleton height={16} width={220} />
          </Group>
        ))}
      </Stack>

      {/* Button */}
      <Skeleton height={48} radius="md" mt="lg" />
    </Stack>
  );
}

export default ProfileViewSkeleton;