import { ProductItem, SearchProductVariant } from "@/constants/types";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  GridCol,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import "./productCard.css";
import Image from "next/image";
import ProductCardImageSectionPLP from "./ProductCardImageSectionPLP";
import ProductDetails from "./ProductDetails";
import { en } from "@/constants/en";
import { IconPlus, IconHeartFilled, IconHeart, IconTrendingUp, Icon, IconProps, IconBrandTinder, IconTagStarred, IconStarFilled, IconBrandTinderFilled } from "@tabler/icons-react";
import ProductCardImageSection from "./ProductCardImageSection";
import { getRandomValue } from "@/utils/helperFunctions";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import ProductDetailsPLP from "./ProductDetailsPLP";

const ProductCard = ({ product, stockQuantity, isPLP = false }: { product: ProductItem; stockQuantity: number; isPLP?: boolean }) => {
  const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants, inStock } = product;
  const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);
  const productAddedToCart = false;
  const productAddedToWishList = false;
  const tags: { icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>, label: string }[]
    = [
      { icon: IconTrendingUp, label: "Trending" },
      { icon: IconHeartFilled, label: "Most Loved" },
      { icon: IconBrandTinderFilled, label: "Most Bought" },
      { icon: IconStarFilled, label: "Featured" }
    ];
  const tag = tags[getRandomValue(tags.length)]
  const TagIcon = tag.icon;
  return (
    <>
      {isPLP ? (
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
          <Stack w={200} className="product-card" >
            <Link href={`/products/${productItemId}`}>
              <Stack w={200} gap={6} style={{ cursor: "pointer" }}>
                <ProductCardImageSection images={images} inStock={inStock} imgSize={200} />
                <ProductDetailsPLP category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} stockQuantity={stockQuantity} />
              </Stack>
            </Link>
          </Stack>
        </Stack>) : (
        <Stack gap={0}>
          <Box className="tag">
            <TagIcon size='16px' />
            <Text size='xs' fw={600} tt='uppercase'>{tag.label}</Text>
          </Box>
          <Stack w={280} gap={8} className="product-card">
            <Link href={`/products/${productItemId}`}>
              <Stack w={280} gap={8} style={{ cursor: "pointer" }}>
                <ProductCardImageSection images={images} imgSize={280} />
                <ProductDetails category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} stockQuantity={stockQuantity} />
              </Stack>
            </Link>
            <Grid gutter={8} className="product-card-1" pb={16}>
              <GridCol span={10}>
                {productAddedToCart ? (
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
                )}
              </GridCol>
              <GridCol span={2}>
                {productAddedToWishList ? (
                  <ActionIcon variant="outline" color="black.9" h="100%" w="100%">
                    <IconHeartFilled
                      style={{ width: "50%", height: "50%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                ) : (
                  <ActionIcon variant="outline" color="black.9" h="100%" w="100%">
                    <IconHeart style={{ width: "50%", height: "50%" }} stroke={1.5} />
                  </ActionIcon>
                )}
              </GridCol>
            </Grid>
          </Stack>
        </Stack>
      )}
    </>)
}


export default ProductCard;
