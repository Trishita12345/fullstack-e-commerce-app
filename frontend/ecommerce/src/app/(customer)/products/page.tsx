import { Box, Button, Card, Divider, Group, Text, Title } from "@mantine/core";
import { PLPResponseDTO, ProductItem } from "@/constants/types";
import ProductCard from "@/(components)/productCard";
import Breadcrumb from "@/(components)/Breadcrumb";
import { apiFetch } from "@/lib/apiFetch";
import './PlpStyles.css'
import { Footer } from "@/(components)/footer";
import PlpPagination from "./(components)/PlpPaginationSection";
import PlpSorting from "./(components)/PlpSorting";
import PlpSearch from "./(components)/PlpSearch";
import PlpFilters from "./(components)/PlpFilters";
import { CategoriesCardType } from "@/(components)/categoriesCard";
import Link from "next/link";
import PlpBottomNav from "./(components)/PlpFilters/mobile/PlpBottomNav";

interface PageProps {
  searchParams: SearchParamsType
}
interface SearchParamsType {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  variants?: Record<string, string[]>;
  page?: string;
  sortBy?: string;
  dir?: string;
  discount?: string;
}
export function buildSearchUrl(filters: SearchParamsType) {
  const searchParams = new URLSearchParams();

  if (filters.q && filters.q !== '') searchParams.append("q", filters.q);
  if (filters.category) searchParams.append("category", filters.category);
  if (filters.minPrice) searchParams.append("minPrice", filters.minPrice);
  if (filters.maxPrice) searchParams.append("maxPrice", filters.maxPrice);
  if (filters.inStock) searchParams.append("inStock", filters.inStock);
  if (filters.sortBy) searchParams.append("sortBy", filters.sortBy);
  if (filters.dir) searchParams.append("dir", filters.dir);
  if (filters.discount) searchParams.append("discount", filters.discount);
  if (filters.variants) {
    const variants = Array.isArray(filters.variants) ? filters.variants : [filters.variants];
    variants?.forEach(value => searchParams.append("variants", value));
  }
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
  const { q, category, minPrice, maxPrice, inStock, variants, page, sortBy, dir, discount } = await searchParams;
  const queryString = buildSearchUrl({ q, category, minPrice, maxPrice, inStock, variants, page, sortBy, dir, discount });
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
      <Box w={260} style={{ borderRight: `1px solid var(--mantine-color-gray-1)` }} py={32} visibleFrom="md">
        <PlpFilters facets={facets}
          categories={categories}
          category={category}
          total={total}
          discount={discount}
          variants={variants}
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStock={inStock}
        />
      </Box>
      <Box w={{ base: '95%', md: "calc(100% - 300px)" }} mx="auto" py={32} pos={'relative'} mb={{ base: 70, md: 0 }}>
        <Breadcrumb items={breadcrumbs} />
        <Title order={1} ta='center' tt={'capitalize'} style={{ fontFamily: "var(--font-jost)" }}>
          {`Explore Products`}
        </Title>
        <PlpSearch query={q} />
        {total > 0 ? (
          <>
            <PlpSorting />
            <Group mt={16} gap={32} justify="space-between" visibleFrom="md">
              {content.map((item: ProductItem) => (
                <ProductCard product={item} key={item.productItemId} isPLP={true} stockQuantity={item.stockQuantity} />
              ))}
            </Group>
            <Group mt={16} gap={32} justify="center" hiddenFrom="md">
              {content.map((item: ProductItem) => (
                <ProductCard product={item} key={item.productItemId} isPLP={true} stockQuantity={item.stockQuantity} />
              ))}
            </Group>
            <Divider color="gray.1" py={48} />
            <PlpPagination paginationDetails={paginationDetails} />
          </>
        ) :
          <Box mt={48} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <Title order={3}>No products found matching your criteria.</Title>
            <Link href="/products">
              <Button color="primaryDark.7">
                Reset Filters
              </Button>
            </Link>
          </Box>
        }
      </Box>
      <PlpBottomNav categories={categories} facets={facets} /> {/* visible below md */}
    </Box >
    <Box mb={65}><Footer /></Box>
  </>;
};

export default PLP;
