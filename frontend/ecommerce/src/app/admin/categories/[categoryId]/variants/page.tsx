import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type {
  Page,
  CategoryListType,
  VariantListType,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Badge, Button, Group, Text, Tooltip } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconEdit,
  IconLeaf,
  IconPlus,
  IconSettingsAutomation,
} from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";

import Link from "next/link";
import { ListPageTableShimmer } from "@/(components)/Shimmer/ListPageTableShimmer";
import Breadcrumb from "@/(components)/Breadcrumb";

interface PageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
}

export default async function Categories({ params, searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1) - 1;
  const sortBy = searchParams.sortBy;
  const direction = searchParams.direction;
  const query = searchParams.query ?? "";

  const categories = await apiFetch<Page<VariantListType>>(
    `/variant/${params.categoryId}?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy: sortBy || "created_At",
        direction: direction || "desc",
      },
    }
  );
  const categoryDetails = await apiFetch<any>(`/category/${params.categoryId}`);
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
      <Link href={".."}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Categories"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <ListPageClient
        title={`Variants of ${categoryDetails.name}`}
        addButton={
          <Link href={`categories/${params.categoryId}/variants/add`}>
            <ActionButton
              Icon={<IconPlus size={"16px"} />}
              label="Create Variant"
              variant="filled"
              c="white"
              size="sm"
            />
          </Link>
        }
        pageData={categories}
        fields={sortableFields}
        tableContent={{
          head: ["Name", "Category Name", "Actions"],
          body: categories.content.map((item: VariantListType) => [
            item.variantName,
            <Group gap={4}>
              {item.CategoryName}
              {item.CategoryId !== params.categoryId && (
                <Badge size="xs" tt="capitalize" color={"primaryDark.7"}>
                  Inherited
                </Badge>
              )}
            </Group>,
            <Link
              href={`categories/${params.categoryId}/variants/${item.variantId}`}
            >
              <ActionButton Icon={<IconEdit size={"16px"} />} label="Edit" />
            </Link>,
          ]),
        }}
      />
    </>
  );
}
