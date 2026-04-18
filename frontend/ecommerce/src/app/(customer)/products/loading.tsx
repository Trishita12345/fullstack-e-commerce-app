import { Box, Center, Divider, Group, Skeleton, Stack } from "@mantine/core";

export default function Loading() {
  return <>
    <Box display='flex' style={{ gap: 20 }}>
      <Box w={260} style={{ borderRight: `1px solid var(--mantine-color-gray-1)` }} py={32} visibleFrom="md">
        <Skeleton width={150} height={26} ml={20} />
        <Divider my={8} color="gray.1" />
        <Stack mt={16} justify="center">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={16} width={200} ml={20} />
          ))}
        </Stack>
        <Divider my={8} color="gray.1" />
        <Stack mt={16} justify="center">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={16} width={200} ml={20} />
          ))}
        </Stack>
        <Divider my={8} color="gray.1" />
        <Stack mt={16} justify="center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={16} width={200} ml={20} />
          ))}
        </Stack>
      </Box>

      <Box mt={20} w={{ base: '95%', md: "calc(100% - 300px)" }}>

        {/* breadcrumb */}
        <Skeleton width={300} height={16} visibleFrom="md" />

        {/* header */}
        <Center><Skeleton width={350} height={35} mt={30} /></Center>

        {/* search */}
        <Center><Skeleton width={400} height={35} my={20} /></Center>

        {/* sorting */}
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }} visibleFrom="md">
          <Skeleton width={250} height={32} my={6} />
        </Box>

        {/* card */}
        <Group mt={16} gap={32} justify="center">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} height={200} width={200} bdrs={0} />
          ))}
        </Group>
      </Box>
    </Box>
  </>;
}
