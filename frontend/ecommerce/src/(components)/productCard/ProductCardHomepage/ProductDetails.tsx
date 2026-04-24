import { getRandomValue, formattedPrice } from "@/utils/helperFunctions";
import { Stack, Group, Rating, Text } from "@mantine/core";

interface ProductDetailsProps {
    category: string;
    productName: string;
    attributeValues: string[];
    basePrice: number;
    sellingPrice: number;
    discountPercentage: number;
    stockQuantity: number;
}

const ProductDetails = ({ category, productName, attributeValues, basePrice, sellingPrice, discountPercentage, stockQuantity }: ProductDetailsProps) => {
    const ratings = [3.5, 4, 4.5, 5]
    const rating = ratings[getRandomValue(ratings.length)]
    return (
        <Stack gap={8} >
            <Group justify="space-between">
                <Text size="xs">{category}</Text>
                <Rating
                    value={rating}
                    fractions={2}
                    color="primaryDark.6"
                    size={"xs"}
                />
            </Group>
            <Text fw={500} lineClamp={1} size="sm" mt={4}>
                {productName}
            </Text>
            <Text size="11px" tt={"uppercase"} fw={500} lts={0.5} mb={4}>
                {attributeValues.join(" | ")}
            </Text>
            {stockQuantity < 6 && <Text size="11px" tt={"capitalize"} fw={500} lts={0.5} mb={4} c={"orange.6"}>
                {stockQuantity === 0 ? 'out of stock' : `only ${stockQuantity} items left!`}
            </Text>}
            {basePrice !== sellingPrice ? (
                <Group gap={8}>
                    <Text td="line-through" c={"black.7"}>
                        {formattedPrice(basePrice)}
                    </Text>
                    <Text size="lg" fw={600} c={"primaryDark.8"}>
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

                >
                    {formattedPrice(basePrice)}
                </Text>
            )}
        </Stack>);
}

export default ProductDetails;