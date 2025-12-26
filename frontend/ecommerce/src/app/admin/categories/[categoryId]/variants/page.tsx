import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type { Page, VariantListType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Badge, Group } from "@mantine/core";
import { IconArrowNarrowLeft, IconEdit, IconPlus } from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";

import Link from "next/link";

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

export default async function Variants({ params, searchParams }: PageProps) {
  const { page: pageParam, sortBy, direction, query = "" } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;
  const { categoryId } = await params;

  const variants = await apiFetch<Page<VariantListType>>(
    `/variant/${categoryId}/page?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy: sortBy || "updated_At",
        direction: direction || "desc",
      },
      cache: "force-cache",
      revalidate: 60,
    }
  );
  const categoryDetails = await apiFetch<any>(`/category/${categoryId}`, {
    cache: "force-cache",
    revalidate: 60,
  });
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
            <Group gap={4}>
              {item.CategoryName}
              {item.CategoryId !== params.categoryId && (
                <Badge size="xs" tt="capitalize" color={"primaryDark.7"}>
                  Inherited
                </Badge>
              )}
            </Group>,
            <Link
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
