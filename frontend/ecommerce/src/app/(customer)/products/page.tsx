import { Box, Divider, Group } from "@mantine/core";
import { PLPResponseDTO, ProductItem } from "@/constants/types";
import ProductCard from "@/(components)/productCard";
import Breadcrumb from "@/(components)/Breadcrumb";
import { apiFetch } from "@/lib/apiFetch";
import './PlpStyles.css'
import PLPPagination from "./(components)/PLPPagination";
import { Footer } from "@/(components)/footer";

interface PageProps {
  searchParams: SearchParamsType
}
interface SearchParamsType {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: boolean;
  variants?: Record<string, string[]>;
  page?: string;
}
export function buildSearchUrl(filters: SearchParamsType) {
  const searchParams = new URLSearchParams();

  if (filters.q) searchParams.append("q", filters.q);
  if (filters.category) searchParams.append("category", filters.category);
  if (filters.minPrice) searchParams.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) searchParams.append("maxPrice", filters.maxPrice.toString());
  if (filters.inStock !== undefined) searchParams.append("inStock", filters.inStock.toString());

  filters.variants && Object.entries(filters.variants).forEach(([name, values]) => {
    values.forEach(value => searchParams.append("variant", `${name}:${value}`));
  });

  searchParams.append("page", ((parseInt(filters.page || '1')) - 1).toString());
  return searchParams.toString();
}
async function getPLPData(queryString: string) {
  return await apiFetch<PLPResponseDTO>(
    `/search-service/public/search?${queryString}`,
    {
      cache: "force-cache",
      revalidate: 3600,
    },
  );
}

const PLP = async ({ searchParams }: PageProps) => {
  const { q, category, minPrice, maxPrice, inStock, variants, page } = await searchParams;
  const queryString = buildSearchUrl({ q, category, minPrice, maxPrice, inStock, variants, page });
  const plpData = await getPLPData(queryString);
  console.log('plpData: ', plpData);
  const { facets, total, products } = plpData;
  const { content, ...paginationDetails } = products;
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
          {content.map((item: ProductItem) => (
            <ProductCard product={item} key={item.productItemId} isPLP={true} />
          ))}
        </Group>
        <Divider color="gray.1" py={48} />
        <PLPPagination paginationDetails={paginationDetails} />
      </Box>
    </Box>
    <Footer />
  </>;
};

export default PLP;
