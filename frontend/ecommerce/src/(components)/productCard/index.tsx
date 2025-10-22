import { ProductsListingProps } from "@/constants/types";
import { formattedPrice } from "@/utils/hooks/helperFunctions";
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
import Image from "next/image";

const ProductCard = ({ product }: { product: ProductsListingProps }) => {
  return (
    <Stack w={320} gap={8}>
      <Image
        src={product.imgUrl}
        width={320}
        height={320}
        alt={""}
        objectFit={"contain"}
      />
      <Group justify="space-between">
        <Text size="xs">{product.subCategory}</Text>
        <Rating
          value={product.rating}
          fractions={2}
          color="primaryDark.6"
          size={"xs"}
        />
      </Group>
      <Text fw={500} size="lg">
        {product.name}
      </Text>
      {product?.discountedPrice ? (
        <Group gap={8}>
          <Text td="line-through" size="md" c={"black.7"}>
            {formattedPrice(product.basePrice)}
          </Text>
          <Text size="xl" fw={700} c={"primaryDark.8"}>
            {formattedPrice(product.discountedPrice)}
          </Text>
        </Group>
      ) : (
        <Text size="xl" fw={700} c={"primaryDark.8"}>
          {formattedPrice(product.basePrice)}
        </Text>
      )}
      <Grid gutter={8}>
        <GridCol span={10}>
          {product.addedToCart ? (
            <Button color="black.9" size={"md"} fullWidth>
              Go to cart
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
                Add to cart
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
