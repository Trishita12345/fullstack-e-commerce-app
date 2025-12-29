import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type {
  Page,
  ProductsListingPageProps,
  SelectOptionType,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { IconArrowNarrowLeft, IconEdit, IconPlus } from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";

import Link from "next/link";
import { FilterButton } from "@/(components)/FilterButton";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
    category?: string;
  };
}

export default async function Products({ searchParams }: PageProps) {
  const {
    page: pageParam,
    sortBy = "updated_At",
    direction = "desc",
    query = "",
    category = "",
  } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;

  const products = await apiFetch<Page<ProductsListingPageProps>>(
    `/product/page?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy,
        direction,
        filters: {
          categories: category === "" ? [] : category.split(","),
        },
      },
      cache: "force-cache",
      revalidate: 60,
    }
  );
  const categoriesForFilter = await apiFetch<SelectOptionType[]>(
    "/category/get-leaf-categories"
  );
  const sortableFields: SortableField[] = [
    {
      field: "name",
      label: "Product Name",
      type: "string",
    },
  ];

  return (
    <>
      <Link href={".."}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Categories"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <ListPageClient
        title={`Products`}
        otherButtons={
          <FilterButton
            fields={[
              {
                label: "Category",
                options: categoriesForFilter.map((o) => ({
                  label: o.label,
                  value: o.label,
                })),
                type: "multiSelect",
                field: "category",
              },
            ]}
          />
        }
        addButton={
          <Link href={`products/add`}>
            <ActionButton
              Icon={<IconPlus size={"16px"} />}
              label="Create Product"
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
    </>
  );
}
