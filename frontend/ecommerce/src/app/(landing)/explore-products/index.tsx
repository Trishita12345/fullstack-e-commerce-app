import ProductCard from "@/(components)/productCard";
import { en } from "@/constants/en";
import { ProductsListingProps } from "@/constants/types";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { products } from "./products";
import SeeAllProductsBtn from "./SeeAllProductsBtn";

const ExploreProducts = () => {
  return (
    <Box bg="gray.0" py={96} px={24}>
      <Stack w={"100%"} justify="center" gap={8}>
        <Text
          style={{ fontFamily: "var(--font-allura)" }}
          size={"2rem"}
          c={"primaryDark.6"}
          ta={"center"}
        >
          {en.trending}
        </Text>
        <Title
          ta={"center"}
          order={1}
          px={8}
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {en.exploreTrendingProducts}
        </Title>
        <Text
          ta={"center"}
          c={"black.7"}
          size="sm"
          px={{ base: 8, sm: 128, md: 256 }}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {en.exploreTrendingProductsDesc}
        </Text>
      </Stack>
      <Group mt={72} w={"90%"} mx={"auto"} gap={48} justify="center">
        {products.map((item: ProductsListingProps) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </Group>
      <SeeAllProductsBtn />
    </Box>
  );
};

export default ExploreProducts;
