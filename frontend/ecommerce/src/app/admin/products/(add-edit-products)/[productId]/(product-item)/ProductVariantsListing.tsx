import { ActionButton } from "@/(components)/ActionButton";
import { ListPageClient } from "@/(components)/adminListPage";
import { ProductsListingPageProps } from "@/constants/types";
import { IconPlus, IconEdit } from "@tabler/icons-react";
import Link from "next/link";

interface PageProps {
  productId?: string;
  searchParams: {
    tab?: "1" | "2";
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
}
const ProductVariantsListing = async ({
  productId,
  searchParams,
}: PageProps) => {
  const {
    page: pageParam,
    sortBy = "updated_At",
    direction = "desc",
    query = "",
  } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;
  const products = {
    content: [],
    empty: false,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 4,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      unpaged: false,
    },
    size: 10,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    totalElements: 4,
    totalPages: 1,
  } as any;
  const sortableFields = [] as any[];
  // const products = await apiFetch<Page<ProductsListingPageProps>>(
  //   `/productItem/${productId}/page?query=${query}`,
  //   {
  //     method: "POST",
  //     body: {
  //       page,
  //       size: 10,
  //       sortBy,
  //       direction,
  //       filters: {
  //         categories: category === "" ? [] : category.split(","),
  //       },
  //     },
  //     cache: "force-cache",
  //     revalidate: 60,
  //   }
  // );
  return (
    <ListPageClient
      title={`Product Items`}
      // otherButtons={
      //   <FilterButton
      //     fields={
      //       [
      //         {
      //           label: "Category",
      //           options: categoriesForFilter.map((o) => ({
      //             label: o.label,
      //             value: o.label,
      //           })),
      //           type: "multiSelect",
      //           field: "category",
      //         },
      //       ]
      //     }
      //   />
      // }
      addButton={
        <Link href={`/admin/products/${productId}/add`}>
          <ActionButton
            Icon={<IconPlus size={"16px"} />}
            label="Create Product Variants"
            variant="filled"
            c="white"
            size="xs"
          />
        </Link>
      }
      pageData={products}
      fields={sortableFields}
      tableContent={{
        head: ["Name", "Category Name", "Actions"],
        body: products.content.map((item: ProductsListingPageProps) => [
          item.productName,
          item.categoryName,
          <Link href={`/admin/products/${item.productId}`}>
            <ActionButton
              Icon={<IconEdit size={"16px"} />}
              label={<u>Edit</u>}
              variant="transparent"
            />
          </Link>,
        ]),
      }}
    />
  );
};

export default ProductVariantsListing;
