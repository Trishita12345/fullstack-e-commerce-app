import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type { Page, CategoryListType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Box, Button, Group, Text, Tooltip } from "@mantine/core";
import {
  IconEdit,
  IconFilter,
  IconLeaf,
  IconSettingsAutomation,
} from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";
import AddEditCategory from "./(add-edit-category)/add-edit-category";
import Link from "next/link";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
}

export default async function Categories({ searchParams }: PageProps) {
  const { page: pageParam, sortBy, direction, query = "" } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;

  const categories = await apiFetch<Page<CategoryListType>>(
    `/category/page?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy: sortBy || "updatedAt",
        direction: direction || "desc",
      },
      cache: "force-cache",
      revalidate: 60,
    }
  );
  const sortableFields: SortableField[] = [
    {
      field: "name",
      label: "Name",
      type: "string",
    },
  ];

  return (
    <Box mt={8}>
      <ListPageClient
        title="Categories"
        addButton={<AddEditCategory />}
        // otherButtons={
        //   <ActionButton
        //     Icon={<IconFilter size={"20"} />}
        //     label={"Filters"}
        //     size="xs"
        //   />
        // }
        pageData={categories}
        fields={sortableFields}
        tableContent={{
          head: ["Name", "Actions"],
          body: categories.content.map((item: any) => [
            <Group gap={6}>
              {item.name}
              {item.isParentCategory || (
                <IconLeaf size={"16px"} color="green" />
              )}
            </Group>,
            <Group>
              <AddEditCategory id={item.id} />
              <Link href={`categories/${item.id}/variants`}>
                <ActionButton
                  Icon={<IconSettingsAutomation size={"16px"} />}
                  label="Configure Variants"
                />
              </Link>
            </Group>,
          ]),
        }}
      />
    </Box>
  );
}
