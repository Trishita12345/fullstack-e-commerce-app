import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type { Page, CategoryListType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Button, Group, Text, Tooltip } from "@mantine/core";
import {
  IconEdit,
  IconLeaf,
  IconSettingsAutomation,
} from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";
import AddEditCategory from "./(add-edit-category)/add-edit-category";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
}

export default async function Categories({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1) - 1;
  const sortBy = searchParams.sortBy;
  const direction = searchParams.direction;
  const query = searchParams.query ?? "";

  const categories = await apiFetch<Page<CategoryListType>>(
    `/category?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy: sortBy || "createdAt",
        direction: direction || "desc",
      },
    }
  );
  console.log(categories);
  const sortableFields: SortableField[] = [
    {
      field: "name",
      label: "Name",
      type: "string",
    },
  ];

  return (
    <ListPageClient
      title="Categories"
      addButton={<AddEditCategory />}
      pageData={categories}
      fields={sortableFields}
      tableContent={{
        head: ["Name", "Actions"],
        body: categories.content.map((item: any) => [
          <Group gap={6}>
            {item.name}
            {item.isParentCategory || <IconLeaf size={"16px"} color="green" />}
          </Group>,
          <Group>
            {/* <ActionButton Icon={<IconEdit size={"16px"} />} label="Edit" /> */}
            <AddEditCategory id={item.id} />
            <ActionButton
              Icon={<IconSettingsAutomation size={"16px"} />}
              label="Configure Variants"
            />
          </Group>,
        ]),
      }}
    />
  );
}
