import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type {
  Page,
  SelectOptionType,
  VariantListType,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Group } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";

import Link from "next/link";
import { FilterButton } from "@/(components)/FilterButton";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
    f?: string;
  };
}

export default async function Variants({ searchParams }: PageProps) {
  const {
    page: pageParam,
    sortBy = "updated_At",
    direction = "desc",
    query = "",
    f = "",
  } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;

  const variants = await apiFetch<Page<VariantListType>>(
    `/product-service/variant/page?query=${query}&page=${page}&sortBy=${sortBy}&direction=${direction}&filter=${f}`,
    {
      cache: "force-cache",
      revalidate: 60,
    }
  );

  const categoriesForFilter = await apiFetch<SelectOptionType[]>(
    "/product-service/category/get-all-categories"
  );
  const sortableFields: SortableField[] = [
    {
      field: "name",
      label: "Variant Name",
      type: "string",
    },
    {
      field: "c.name",
      label: "Category Name",
      type: "string",
    },
  ];

  return (
    <>
      <ListPageClient
        title={`Variants`}
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
          <Link href={`variants/add`}>
            <ActionButton
              Icon={<IconPlus size={"16px"} />}
              label="Create Variant"
              variant="filled"
              c="white"
              size="xs"
            />
          </Link>
        }
        pageData={variants}
        fields={sortableFields}
        tableContent={{
          head: ["Name", "Category Name", "Actions"],
          body: variants.content.map((item: VariantListType) => [
            item.variantName,
            <Group key={item.CategoryName} gap={4}>
              {item.CategoryName}
            </Group>,
            <Link
              key={item.variantId}
              href={`/admin/categories/${item.CategoryId}/variants/${item.variantId}`}
            >
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
