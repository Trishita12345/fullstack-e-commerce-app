import { getRandomRating, formattedPrice } from "@/utils/helperFunctions";
import { Stack, Group, Rating, Text } from "@mantine/core";

interface ProductDetailsProps {
    category: string;
    productName: string;
    attributeValues: string[];
    basePrice: number;
    sellingPrice: number;
    discountPercentage: number
}

const ProductDetails = ({ category, productName, attributeValues, basePrice, sellingPrice, discountPercentage }: ProductDetailsProps) => {
    return (<Stack gap={8} ><Group justify="space-between" className="product-card-1">
        <Text size="xs">{category}</Text>
        <Rating
            value={getRandomRating()}
            fractions={2}
            color="primaryDark.6"
            size={"xs"}
        />
    </Group>
        <Text fw={500} className="product-card-1" lineClamp={1} size="sm" mt={4}>
            {productName}
        </Text>
        <Text size="11px" className="product-card-1" tt={"uppercase"} fw={500} lts={0.5} mb={4}>
            {attributeValues.join(" | ")}
        </Text>
        {basePrice !== sellingPrice ? (
            <Group gap={8} className="product-card-1">
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
                className="product-card-1"
            >
                {formattedPrice(basePrice)}
            </Text>
        )}</Stack>);
}

export default ProductDetails;