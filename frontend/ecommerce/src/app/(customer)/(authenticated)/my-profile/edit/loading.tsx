
import { Skeleton, Stack, Group, Box } from "@mantine/core";

export default function ProfileFormSkeleton() {
  return (
    <Stack spacing="md" maw={500} mx='auto' my={32} px={24}>
      
      {/* Back Button */}
      <Skeleton height={20} width={180} radius="sm" />

      {/* Full Name */}
      <Box>
        <Skeleton height={12} width={100} mb={6} />
        <Skeleton height={36} radius="md" />
      </Box>

      {/* Email */}
      <Box>
        <Skeleton height={12} width={80} mb={6} />
        <Skeleton height={36} radius="md" />
      </Box>

      {/* Phone */}
      <Box>
        <Skeleton height={12} width={110} mb={6} />
        <Skeleton height={36} radius="md" />
      </Box>

      {/* Gender */}
      <Box>
        <Skeleton height={12} width={70} mb={6} />
        <Skeleton height={36} radius="md" />
      </Box>

      {/* DOB */}
      <Box>
        <Skeleton height={12} width={120} mb={6} />
        <Skeleton height={36} radius="md" />
      </Box>

      {/* Profile Image Section */}
      <Box>
        <Skeleton height={12} width={120} mb={6} />
        <Group>
          <Skeleton height={120} width={120} radius="md" />
          <Skeleton height={120} width={120} radius="md" />
        </Group>
      </Box>

      {/* Buttons */}
      <Group mt="md">
        <Skeleton height={36} width={100} radius="md" />
        <Skeleton height={36} width={100} radius="md" />
      </Group>
    </Stack>
  );
}
