"use client";

import {
    Button,
    Container,
    Stack,
    Title,
    Text,
    Paper,
    Code,
    CopyButton,
    Group,
} from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

export default function ErrorPage({
    error,
}: {
    error: Error;
}) {
    const reset = () => {
        window.location.reload();
    };

    const traceId = error?.cause as string; // 👈 treating message as traceId
    console.error("Error Page Rendered with error:", error, "Trace ID:", traceId);
    return (
        <Container size="sm" py="xl">
            <Paper shadow="md" p="xl" radius="lg" withBorder>
                <Stack align="center" gap="md">
                    <IconMoodSad size={50} stroke={1.5} />

                    <Title order={2}>Oops! Something went wrong</Title>

                    <Text c="dimmed" ta="center">
                        An unexpected error occurred. Please try again or contact support.
                    </Text>

                    {/* ✅ Trace ID section */}
                    {traceId && (
                        <Stack align="center" gap={4}>
                            <Text size="sm" c="dimmed">
                                Reference ID
                            </Text>

                            <Group gap="xs">
                                <Code>{traceId}</Code>

                                <CopyButton value={traceId}>
                                    {({ copied, copy }) => (
                                        <Button size="xs" variant="light" onClick={copy}>
                                            {copied ? "Copied" : "Copy"}
                                        </Button>
                                    )}
                                </CopyButton>
                            </Group>
                        </Stack>
                    )}


                    <Button onClick={reset}>Try again</Button>
                </Stack>
            </Paper>
        </Container>
    );
}