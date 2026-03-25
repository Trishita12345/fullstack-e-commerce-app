import { ProductItem, SearchProductVariant } from "@/constants/types";
import { Stack, Box, Text } from "@mantine/core"
import Link from "next/link";
import ProductCardImageSection from "../ProductCardImageSection";
import ProductDetailsPLP from "./ProductDetailsPLP";

const ProductCartPlp = ({ product, stockQuantity }: { product: ProductItem; stockQuantity: number }) => {
    return (
        <Stack gap={0}>
            <Box className="tag" style={{
                visibility: stockQuantity < 6 ? 'visible' : 'hidden',
                backgroundColor: "gray",
                color: "white"
            }}>
                <Text
                    size="11px"
                    tt={"capitalize"}
                    fw={600}
                    lts={0.5}
                >
                    {stockQuantity === 0 ? 'out of stock' : `only ${stockQuantity} items left!`}
                </Text>
            </Box>
            <PlpResponsiveCard product={product} />
        </Stack>
    )
}

export default ProductCartPlp;

const PlpResponsiveCard = ({ product }: { product: ProductItem }) => {
    const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants, inStock } = product;
    const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);
    const mdWidth = 200;
    const xsWidth = 150;
    return (
        <>
            <Stack w={mdWidth} className="product-card" visibleFrom="md">
                <Link href={`/products/${productItemId}`}>
                    <Stack w={mdWidth} gap={6} style={{ cursor: "pointer" }}>
                        <ProductCardImageSection images={images} inStock={inStock} imgSize={mdWidth} />
                        <ProductDetailsPLP productItemId={productItemId} category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} stockQuantity={discountPercentage} />
                    </Stack>
                </Link>
            </Stack>
            <Stack w={xsWidth} hiddenFrom="md">
                <Link href={`/products/${productItemId}`}>
                    <Stack w={xsWidth} gap={6} style={{ cursor: "pointer" }}>
                        <ProductCardImageSection images={images} inStock={inStock} imgSize={xsWidth} />
                        <ProductDetailsPLP productItemId={productItemId} category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} stockQuantity={discountPercentage} />
                    </Stack>
                </Link>
            </Stack>
        </>
    )
}