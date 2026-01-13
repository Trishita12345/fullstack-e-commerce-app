import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type { Page, CategoryListType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Box, Group, Text } from "@mantine/core";
import {
  IconEdit,
  IconLeaf,
  IconPlus,
  IconSettingsAutomation,
} from "@tabler/icons-react";
import { ActionButton } from "@/(components)/ActionButton";
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
  const {
    page: pageParam,
    sortBy = "updatedAt",
    direction = "desc",
    query = "",
  } = await searchParams;

  const page = Number(pageParam ?? 1) - 1;

  const categories = await apiFetch<Page<CategoryListType>>(
    `/product-service/category/page?query=${query}&page=${page}&sortBy=${sortBy}&direction=${direction}`,
    {
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
        addButton={
          <Link href={`categories/add`}>
            <ActionButton
              Icon={<IconPlus size={"20"} />}
              label={"Create Category"}
              variant="filled"
              c="white"
              size="xs"
            />
          </Link>
        }
        pageData={categories}
        fields={sortableFields}
        tableContent={{
          head: ["Name", "Actions"],
          body: categories.content.map((item) => [
            <Group gap={6} key={item.name}>
              {item.name}
              {item.isParentCategory || (
                <IconLeaf size={"16px"} color="green" />
              )}
            </Group>,
            <Group gap={0} align="center" key={item.id}>
              {/* <AddEditCategory id={item.id} /> */}
              <Link href={`categories/${item.id}`}>
                <ActionButton
                  Icon={<IconEdit size={"16px"} />}
                  label={<u>{"Edit"}</u>}
                  variant="transparent"
                />
              </Link>
              <Text key={item.id + "-seprator"} c="dimmed">
                |
              </Text>
              <Link
                href={`categories/${item.id}/variants`}
                key={item.id + "-link"}
              >
                <ActionButton
                  Icon={<IconSettingsAutomation size={"16px"} />}
                  // label="Configure Variants"
                  label={<u>{"Configure Variants"}</u>}
                  variant="transparent"
                />
              </Link>
            </Group>,
          ]),
        }}
      />
    </Box>
  );
}
