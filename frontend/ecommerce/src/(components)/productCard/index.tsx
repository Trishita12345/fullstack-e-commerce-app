import { ProductsListingProps } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  ActionIcon,
  Button,
  Grid,
  GridCol,
  Group,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { IconHeart, IconHeartFilled, IconPlus } from "@tabler/icons-react";
import ResponsiveImage from "../responsiveImage";
import { en } from "@/constants/en";
import Link from "next/link";
import "./productCard.css";

const ProductCard = ({ product }: { product: ProductsListingProps }) => {
  return (
    <Stack w={320} gap={8} className="product-card">
      <Link href={`/products/${"8c3d56ab-640f-42fd-aebe-fc6a6d441db9"}`}>
        <Stack w={320} gap={8} style={{ cursor: "pointer" }}>
          <ResponsiveImage src={product.imgUrl} />
          <Group justify="space-between" className="product-card-1">
            <Text size="xs">{product.subCategory}</Text>
            <Rating
              value={product.rating}
              fractions={2}
              color="primaryDark.6"
              size={"xs"}
            />
          </Group>
          <Text fw={500} size="lg" className="product-card-1">
            {product.name}
          </Text>
          {product?.discountedPrice ? (
            <Group gap={8} className="product-card-1">
              <Text td="line-through" size="md" c={"black.7"}>
                {formattedPrice(product.basePrice)}
              </Text>
              <Text size="xl" fw={700} c={"primaryDark.8"}>
                {formattedPrice(product.discountedPrice)}
              </Text>
            </Group>
          ) : (
            <Text
              size="xl"
              fw={700}
              c={"primaryDark.8"}
              className="product-card-1"
            >
              {formattedPrice(product.basePrice)}
            </Text>
          )}
        </Stack>
      </Link>
      <Grid gutter={8} className="product-card-1" pb={16}>
        <GridCol span={10}>
          {product.addedToCart ? (
            <Button color="black.9" size={"md"} fullWidth>
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
              <Text ml={48} fw={500}>
                {en.addToCart}
              </Text>
            </Button>
          )}
        </GridCol>
        <GridCol span={2}>
          {product.addedToWishList ? (
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
  );
};

export default ProductCard;
