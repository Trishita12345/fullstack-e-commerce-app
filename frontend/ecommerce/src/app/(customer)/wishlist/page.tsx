import ResponsiveImage from "@/(components)/responsiveImage";
import { CartProducts, CartProductsDTO } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import { formattedPrice } from "@/utils/helperFunctions";
import { Box, Button, Card, CardSection, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import RemoveWishlistIcon from "./RemoveWishlistIcon";
import MoveToBagButton from "./MoveToBagButton";
import Image from "next/image";
import { IconPointer } from "@tabler/icons-react";

const WishlistPage = async () => {
    const wishlistedItems = await serverApiFetch<string[]>(
        "/cart-service/wishlisted"
    )
    const wishlistedItemDetails = await serverApiFetch<CartProductsDTO>(
        "/product-service/public/products/cart-item-details",
        {
            method: "POST",
            body: wishlistedItems
        }
    )

    const WishlistEmpty = () => (
        <Stack mx={"auto"} w={"100%"} align="center" gap={8}>
            <Image src="/assets/WishlistEmpty.svg" height={300} width={300} alt="empty" />
            {/* <Text c={"dimmed"} ta={"center"} size="xl" fw={700} w={"300px"}>No favorites yet — let’s change that.</Text> */}
            <Link href={"/"}>
                <Stack align="center">
                    <Text c="primaryDark.7" ta={"center"} size="xl" fw={700} w={"350px"}>No favorites yet — let’s change that.</Text>
                    <Group gap={2}><IconPointer /><Text size="xs" c="dimmed" fw={500}>Click Here</Text></Group>
                </Stack>
            </Link>
        </Stack>
    )

    const WishlistCardItem = (wishlistedDetails: CartProducts) => {
        const discounted = ((wishlistedDetails.basePrice - wishlistedDetails.discountedPrice) / wishlistedDetails.basePrice * 100)
        const isOutOfStock = wishlistedDetails.availableStock == 0
        return <GridCol key={wishlistedDetails.productItemId} span={{ base: 12, xs: 6, sm: 4, md: 3.8, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection >
                    <Box pos={"relative"}>
                        <Link href={`/products/${wishlistedDetails.productItemId}`}><ResponsiveImage
                            src={wishlistedDetails.imgUrl}
                            width={300}
                            height={280}
                            style={{
                                filter: isOutOfStock ? "grayscale(1)" : "none"
                            }}

                        /></Link>
                        <RemoveWishlistIcon productItemId={wishlistedDetails.productItemId} />
                    </Box>
                </CardSection>
                <Text size="xs" ta={"center"} truncate="end" my={8}>{wishlistedDetails.productName}</Text>
                <Group justify="center" gap={8} mb={8}>
                    <Text fw={500} size="sm" c="black.8">{formattedPrice(wishlistedDetails.discountedPrice)}</Text>
                    {!isOutOfStock && discounted > 0 &&
                        <>
                            <Text fw={500} size="xs" td="line-through" c={"dimmed"}>{formattedPrice(wishlistedDetails.basePrice)}</Text>
                            <Text size="xs" c={'primaryDark.7'}>(
                                {((discounted).toFixed())}% off)
                            </Text>
                        </>
                    }
                </Group>
                <CardSection withBorder>
                    <MoveToBagButton isOutOfStock={isOutOfStock} wishlistedDetails={wishlistedDetails} />
                </CardSection>

            </Card>
        </GridCol>;
    }
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
                    <Text fw={300} c="black.7">{wishlistedItems.length} Item{wishlistedItems.length > 1 && 's'}</Text>
                </Group>
                {wishlistedItems.length > 0 ?
                    <Grid gutter={{ base: 16, sm: 24, md: 28, lg: 32 }}>
                        {
                            wishlistedItems
                                .map((item: string) =>
                                    <WishlistCardItem key={item} {...wishlistedItemDetails[item]} />
                                )
                        }

                    </Grid>
                    :
                    <WishlistEmpty />
                }

            </Box>
        </Box>
    );
}

export default WishlistPage;
