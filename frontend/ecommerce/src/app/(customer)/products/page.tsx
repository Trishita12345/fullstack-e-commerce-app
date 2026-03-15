import { Box, Divider, Group, Title } from "@mantine/core";
import { PLPResponseDTO, ProductItem } from "@/constants/types";
import ProductCard from "@/(components)/productCard";
import Breadcrumb from "@/(components)/Breadcrumb";
import { apiFetch } from "@/lib/apiFetch";
import './PlpStyles.css'
import { Footer } from "@/(components)/footer";
import PlpPagination from "./(components)/PlpPaginationSection";
import PlpSorting from "./(components)/PlpSorting";
import PlpSearch from "./(components)/PlpSearch";
import PlpFilter from "./(components)/PlpFilter";
import { CategoriesCardType } from "@/(components)/categoriesCard";

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
  sortBy?: string;
  dir?: string;
}
export function buildSearchUrl(filters: SearchParamsType) {
  const searchParams = new URLSearchParams();

  if (filters.q) searchParams.append("q", filters.q);
  if (filters.category) searchParams.append("category", filters.category);
  if (filters.minPrice) searchParams.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) searchParams.append("maxPrice", filters.maxPrice.toString());
  if (filters.inStock !== undefined) searchParams.append("inStock", filters.inStock.toString());
  if (filters.sortBy) searchParams.append("sortBy", filters.sortBy);
  if (filters.dir) searchParams.append("dir", filters.dir);

  filters.variants && Object.entries(filters.variants).forEach(([name, values]) => {
    values.forEach(value => searchParams.append("variant", `${name}:${value}`));
  });
  if (filters.page) searchParams.append("page", (parseInt(filters.page) - 1).toString());
  return searchParams.toString();
}
async function getPLPData(queryString: string) {
  console.log('Fetching PLP data with query:', `/search-service/public/search?${queryString}`);
  return await apiFetch<PLPResponseDTO>(
    `/search-service/public/search?${queryString}`,
  );
}

const PLP = async ({ searchParams }: PageProps) => {
  const { q, category, minPrice, maxPrice, inStock, variants, page, sortBy, dir } = await searchParams;
  const queryString = buildSearchUrl({ q, category, minPrice, maxPrice, inStock, variants, page, sortBy, dir });
  const plpData = await getPLPData(queryString);

  const categories = await apiFetch<CategoriesCardType[]>(
    "/product-service/public/categories/leaf",
    {
      cache: "force-cache",
      revalidate: 60,
    }
  );

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
        display: "flex",
      }}
    >
      <Box w={260} style={{ borderRight: `1px solid var(--mantine-color-gray-1)` }} py={32}>
        <PlpFilter facets={facets} categories={categories} />
      </Box>
      <Box w={"calc(100% - 300px)"} mx="auto" py={32}>
        <Breadcrumb items={breadcrumbs} />
        <Title order={1} ta='center' tt={'capitalize'} style={{ fontFamily: "var(--font-jost)" }}>
          {`Explore Products`}
        </Title>
        <PlpSearch query={q} />
        <PlpSorting sortBy={sortBy} dir={dir} />
        <Group mt={16} gap={32} justify="space-between">
          {content.map((item: ProductItem) => (
            <ProductCard product={item} key={item.productItemId} isPLP={true} />
          ))}
        </Group>
        <Divider color="gray.1" py={48} />
        <PlpPagination paginationDetails={paginationDetails} />
      </Box>
    </Box>
    <Footer />
  </>;
};

export default PLP;
