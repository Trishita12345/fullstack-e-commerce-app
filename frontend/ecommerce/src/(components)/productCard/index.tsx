import { ProductItem, SearchProductVariant } from "@/constants/types";
import { formattedPrice, getRandomRating } from "@/utils/helperFunctions";
import {
  Group,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import "./productCard.css";
import Image from "next/image";

const ProductCard = ({ product, isPLP = false }: { product: ProductItem; isPLP?: boolean }) => {
  const { productItemId, images, productName, sellingPrice, basePrice, discountPercentage, category, variants } = product;
  const attributeValues = variants.map((variant: SearchProductVariant) => variant.value);
  const productAddedToCart = false;
  const productAddedToWishList = false;
  const thumbnailUrl = images.find((img) => img.isThumbnail)?.imgUrl;
  return (
    <Stack w={280} gap={8} className="product-card">
      <Link href={`/products/${productItemId}`}>
        <Stack w={280} gap={8} style={{ cursor: "pointer" }}>
          <Image src={thumbnailUrl ?? ''} width={280} height={280} alt={productItemId} />
          <Group justify="space-between" className="product-card-1">
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
          )}
        </Stack>
      </Link>
      {/* <Grid gutter={8} className="product-card-1" pb={16}>
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
      </Grid> */}
    </Stack>
  );
};

export default ProductCard;
