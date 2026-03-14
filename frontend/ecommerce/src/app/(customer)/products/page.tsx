import { Box, Group } from "@mantine/core";
import { productsResponse } from "../(landing)/explore-products/products";
import { PLPResponseDTO, ProductItem } from "@/constants/types";
import ProductCard from "@/(components)/productCard";
import Breadcrumb from "@/(components)/Breadcrumb";
import { apiFetch } from "@/lib/apiFetch";

interface PageProps {
  searchParams: {
    category: string;
  };
}
async function getPLPData(category: string) {
  return await apiFetch<PLPResponseDTO>(
    // `/product-service/public/products?category=${category}`,
    // `/search-service/public/search?q=mobi&category=${category}&minPrice=2000&maxPrice=4000&inStock=true&variant=color%3Ared&variant=fragrance%3Alavender&page=0&size=20`,
    `/search-service/public/search`,//?category=${category}`,
    {
      cache: "force-cache",
      revalidate: 3600,
    },
  );
}

const PLP = async ({ searchParams }: PageProps) => {
  const { category } = await searchParams;
  const plpData = await getPLPData(category);
  console.log('plpData: ', plpData);
  const breadcrumbs = [
    { title: "Home", href: "/" },
    {
      title: category || "All Products",
      href: "#",
      active: true,
    }
  ];
  return <>
    <Box
      bg="gray.0"
      style={{
        borderTop: `1.5px solid var(--mantine-color-gray-1)`,
      }}
    >
      <Box w={"90%"} mx="auto" py={32}>
        <Breadcrumb items={breadcrumbs} />
        <Group mt={72} gap={32} justify="center">
          {plpData.products.content.map((item: ProductItem) => (
            <ProductCard product={item} key={item.productItemId} isPLP={true} />
          ))}
        </Group>
      </Box>
    </Box>

  </>;
};

export default PLP;
