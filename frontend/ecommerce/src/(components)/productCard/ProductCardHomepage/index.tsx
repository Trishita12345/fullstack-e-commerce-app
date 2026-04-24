import { Stack, Box, Text } from "@mantine/core";
import { IconHeartFilled, Icon, IconBrandTinderFilled, IconProps, IconStarFilled, IconTrendingUp, IconShoppingBagCheck } from "@tabler/icons-react";
import Link from "next/link";
import ProductCardImageSection from "../ProductCardImageSection";
import ProductDetails from "./ProductDetails";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { getRandomValue } from "@/utils/helperFunctions";
import { ProductItem, SearchProductVariant } from "@/constants/types";
import ProductCardHomepageButtonSection from "./ProductCardHomepageButtonSection";

const tags: { icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>, label: string }[]
    = [
        // { icon: IconBrandTinderFilled, label: "Newly Added" }, //createdAt_desc
        // { icon: IconShoppingBagCheck, label: "Most Bought" }, //popularity_desc
        { icon: IconTrendingUp, label: "Trending" }, //trending_desc
        // { icon: IconHeartFilled, label: "Most Loved" }, //rating_desc
        // { icon: IconStarFilled, label: "Featured" }, //featured_desc
    ];

const ProductCardHomepage = async ({ product, stockQuantity }: { product: ProductItem, stockQuantity: number }) => {
    const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants, inStock } = product;
    const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);

    const tag = tags[getRandomValue(tags.length)]
    const TagIcon = tag.icon;
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