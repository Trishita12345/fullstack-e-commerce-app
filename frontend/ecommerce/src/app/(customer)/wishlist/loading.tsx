
import { Box, Card, CardSection, Grid, GridCol, Group, Skeleton, Text } from "@mantine/core";
const WishlistCardSkeleton = () => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection>
                <Box pos="relative">
                    <Skeleton height={280} width="100%" />
                </Box>
            </CardSection>
            <Skeleton mt={8} height={12} width="80%" mx="auto" />
            <Group justify="center" gap={8} my={8}>
                <Skeleton height={14} width={60} />
                <Skeleton height={12} width={40} />
                <Skeleton height={12} width={50} />
            </Group>

            <CardSection withBorder>
                <Group justify="center">
                    <Skeleton height={32} radius="sm" px={16} my={6} width={150} />
                </Group>
            </CardSection>
        </Card>
    );
}
const LoadingWishlist = () => {
    return (
        <Box
            bg="gray.0"
            style={{
                borderTop: `1.5px solid var(--mantine-color-gray-1)`,
            }}
        >
            <Box w={{ base: "90%", md: "85%" }} mx="auto" py={48}>
                <Group gap={8} mb={24}>
                    <Text fw={700} size="md">My Wishlist</Text>
                    <Skeleton height={32} radius="sm" mx={16} my={6} width={80} />
                </Group>
                <Grid gutter={{ base: 16, sm: 24, md: 28, lg: 32 }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <GridCol span={{ base: 6, sm: 4, md: 3 }} key={index}>
                            <WishlistCardSkeleton />
                        </GridCol>
                    ))}
                </Grid>

            </Box>
        </Box>
    );
}

export default LoadingWishlist;
