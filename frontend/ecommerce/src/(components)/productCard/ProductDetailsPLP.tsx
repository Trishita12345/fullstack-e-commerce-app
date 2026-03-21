import { en } from "@/constants/en";
import { getRandomValue, formattedPrice } from "@/utils/helperFunctions";
import { Stack, Group, Rating, Text, Box, ActionIcon, Button } from "@mantine/core";
import { IconPlus, IconHeartFilled, IconHeart } from "@tabler/icons-react";

interface ProductDetailsProps {
    category: string;
    productName: string;
    attributeValues: string[];
    basePrice: number;
    sellingPrice: number;
    discountPercentage: number;
    stockQuantity: number;
}

const ProductDetailsPLP = ({ category, productName, attributeValues, basePrice, sellingPrice, discountPercentage, stockQuantity }: ProductDetailsProps) => {
    const ratings = [3.5, 4, 4.5, 5]
    const rating = ratings[getRandomValue(ratings.length)]
    const productAddedToCart = false;
    return (
        <>
            <Stack gap={8} className="product-card-1-plp">
                <Box display={'flex'} style={{ justifyContent: "space-between", width: '100%' }} >
                    <Text size="xs" lineClamp={1}>{category}</Text>
                    <Rating
                        value={rating}
                        fractions={2}
                        color="primaryDark.6"
                        size={"xs"}
                    />
                </Box>
                <Text fw={500} lineClamp={1} size="sm" mt={4}>
                    {productName}
                </Text>
            </Stack>
            <Box className="product-card-2-plp">
                {stockQuantity === 0 ?
                    <>
                        <Button color="black.4" size={"md"} fullWidth disabled>
                            Out Of Stock
                        </Button>
                    </> :
                    <>
                        {
                            productAddedToCart ? (
                                <Button color="black.9" size={"md"} fullWidth >
                                    {en.goToCart}
                                </Button>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="outline"
                                    color="black.9"
                                    rightSection={<IconPlus size={18} />}
                                    size={"md"}
                                    styles={{
                                        inner: {
                                            width: "100%",
                                            justifyContent: "space-between",
                                        },
                                    }}
                                >
                                    <Text ml={36} fw={500}>
                                        {en.addToCart}
                                    </Text>
                                </Button>
                            )}</>
                }
            </Box >
            <Box>
                {basePrice !== sellingPrice ? (
                    <Group gap={4}>
                        <Text td="line-through" c={"black.7"} size="xs">
                            {formattedPrice(basePrice)}
                        </Text>
                        <Text size="sm" fw={600} c={"primaryDark.8"}>
                            {formattedPrice(sellingPrice)}
                        </Text>
                        <Text size="xs" fw={500} c={"orange.6"}>
                            ({Math.floor(discountPercentage)}% OFF)
                        </Text>
                    </Group>
                ) : (
                    <Text
                        size="lg"
                        fw={600}
                        c={"primaryDark.8"}
                        className="product-card-2"
                    >
                        {formattedPrice(basePrice)}
                    </Text>
                )}
            </Box>
        </>);
}

export default ProductDetailsPLP;