import { ProductItem, SearchProductVariant } from "@/constants/types";
import {
  ActionIcon,
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
import { IconPlus, IconHeartFilled, IconHeart } from "@tabler/icons-react";
import ProductCardImageSection from "./ProductCardImageSection";

const ProductCard = ({ product, isPLP = false }: { product: ProductItem; isPLP?: boolean }) => {
  const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants } = product;
  const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);
  const productAddedToCart = false;
  const productAddedToWishList = false;
  return (
    <>
      {isPLP ? (
        <Stack w={280} gap={8} className="product-card" >
          <Link href={`/products/${productItemId}`}>
            <Stack w={280} gap={8} style={{ cursor: "pointer" }}>
              <ProductCardImageSectionPLP images={images} productItemId={productItemId} />
              <ProductDetails category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} />
            </Stack>
          </Link>
        </Stack>) : (
        <Stack w={280} gap={8} className="product-card" >
          <Link href={`/products/${productItemId}`}>
            <Stack w={280} gap={8} style={{ cursor: "pointer" }}>
              <ProductCardImageSection images={images} productItemId={productItemId} />
              <ProductDetails category={category} productName={productName} attributeValues={attributeValues} basePrice={basePrice} sellingPrice={sellingPrice} discountPercentage={discountPercentage} />
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
      )}
    </>)
}


export default ProductCard;
