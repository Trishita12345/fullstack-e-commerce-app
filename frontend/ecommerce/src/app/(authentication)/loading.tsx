import { Loader, Stack, Text } from "@mantine/core";

export default function Loading() {
    return (
        <Stack gap={16} align="center" py={32}>
            <Loader variant="dots" color="primaryDark.7" />
            <Text size="14px" c="dimmed">
                Loading Login Screen...
            </Text>
        </Stack>
    );
}