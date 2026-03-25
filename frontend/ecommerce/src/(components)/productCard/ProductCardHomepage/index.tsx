import { Stack, Box, Text } from "@mantine/core";
import { IconHeartFilled, Icon, IconBrandTinderFilled, IconProps, IconStarFilled, IconTrendingUp } from "@tabler/icons-react";
import Link from "next/link";
import ProductCardImageSection from "../ProductCardImageSection";
import ProductDetails from "./ProductDetails";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { getRandomValue } from "@/utils/helperFunctions";
import { ProductItem, SearchProductVariant } from "@/constants/types";
import ProductCardHomepageButtonSection from "./ProductCardHomepageButtonSection";

const tags: { icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>, label: string }[]
    = [
        { icon: IconTrendingUp, label: "Trending" },
        { icon: IconHeartFilled, label: "Most Loved" },
        { icon: IconBrandTinderFilled, label: "Most Bought" },
        { icon: IconStarFilled, label: "Featured" }
    ];

const tag = tags[getRandomValue(tags.length)]
const TagIcon = tag.icon;

const ProductCardHomepage = async ({ product, stockQuantity }: { product: ProductItem, stockQuantity: number }) => {
    const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants, inStock } = product;
    const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);
    return (
        <Stack gap={0}>
            <Box className="tag">
                <TagIcon size='16px' />
                <Text size='xs' fw={600} tt='uppercase'>{tag.label}</Text>
            </Box>
            <Stack w={{ base: 320, sm: 280 }} gap={8} className="product-card">
                <Link href={`/products/${productItemId}`}>
                    <Stack w={{ base: 320, sm: 280 }} gap={8} style={{ cursor: "pointer" }}>
                        <Box visibleFrom="sm"><ProductCardImageSection images={images} imgSize={280} /></Box>
                        <Box hiddenFrom="sm"><ProductCardImageSection images={images} imgSize={320} /></Box>
                        <ProductDetails category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} stockQuantity={stockQuantity} />
                    </Stack>
                </Link>
                <ProductCardHomepageButtonSection product={product} />
            </Stack>
        </Stack>
    )
}
export default ProductCardHomepage;