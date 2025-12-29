"use client";

import {
  Anchor,
  Badge,
  Button,
  Group,
  Pagination,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconCircleX, IconPlus, IconX } from "@tabler/icons-react";
import { SortButton, SortableField } from "./SortButton";
import type { Page } from "@/constants/types";
import React from "react";

interface Props<T> {
  title: string;
  pageData: Page<T>;
  addButton: React.ReactNode;
  otherButtons?: React.ReactNode;
  tableContent: any;
  fields?: SortableField[];
}

export function ListPageClient<T>({
  title,
  pageData,
  addButton,
  tableContent,
  otherButtons,
  fields = [],
}: Props<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const NON_FILTER_KEYS = ["query", "page", "sortBy", "direction", "tab"];

  const filterValues = [...searchParams.entries()]
    .filter(([key]) => !NON_FILTER_KEYS.includes(key))
    .flatMap(([, value]) => value.split(","));

  const { empty, numberOfElements, totalElements, totalPages, size, pageable } =
    pageData;

  const footerMsg = empty
    ? "No result found"
    : `Showing ${size * pageable.pageNumber + 1} to ${
        size * pageable.pageNumber + numberOfElements
      } of ${totalElements} items`;

  const updateParams = useDebouncedCallback(
    ({ page = 1, sortBy, direction, query }: any) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", page.toString());
      if (sortBy) params.set("sortBy", sortBy);
      if (direction) params.set("direction", direction);
      if (query !== undefined) params.set("query", query);

      router.push(`?${params.toString()}`);
    },
    500
  );

  const removeFilter = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    // keys that are NOT filters
    const nonFilterKeys = new Set(["page", "sortBy", "direction"]);
    for (const [key, value] of params.entries()) {
      if (nonFilterKeys.has(key)) continue;
      const values = value.split(",");
      const updatedValues = values.filter((v) => v !== item);
      if (updatedValues.length === 0) {
        params.delete(key);
      } else {
        params.set(key, updatedValues.join(","));
      }
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack gap={2}>
      <Group justify="space-between">
        <h2 style={{ margin: "8px 0px" }}>{title}</h2>
        <Group>
          {otherButtons && otherButtons}
          <SortButton
            fields={fields as SortableField[]}
            onItemClick={updateParams}
          />
          {addButton}
        </Group>
      </Group>
      <Group mb={"xs"} gap={"xs"}>
        {filterValues.map((item: string) => (
          <Badge
            key={item}
            variant="light"
            color={"primaryDark.7"}
            rightSection={
              <IconX
                size={14}
                style={{ marginLeft: 6, cursor: "pointer" }}
                onClick={() => removeFilter(item)}
              />
            }
            size="md"
            tt={"capitalize"}
          >
            {item}
          </Badge>
        ))}
      </Group>
      <Table stickyHeader withTableBorder data={tableContent} />

      {/* Footer */}
      <Group justify="space-between" mt={4}>
        <Text c="dimmed" size="xs">
          {footerMsg}
        </Text>
        {totalPages !== 1 && (
          <Pagination
            total={totalPages}
            value={pageable.pageNumber + 1}
            onChange={(page) => updateParams({ page })}
            withPages={false}
          />
        )}
      </Group>
    </Stack>
  );
}
