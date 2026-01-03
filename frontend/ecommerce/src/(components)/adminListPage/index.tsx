"use client";

import {
  Badge,
  Group,
  Pagination,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { SortButton, SortableField } from "./SortButton";
import type { Page } from "@/constants/types";
import React from "react";
import { formattedPrice } from "@/utils/helperFunctions";

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
  const filterStr = searchParams.get("f");
  const filterValues =
    ((filterStr || filterStr !== "") &&
      filterStr?.split("::").flatMap((i) => {
        const [key, values] = i.split(":");
        if (key == "Price") {
          return `${values.split(",").map(v=>formattedPrice(parseInt(v))).join(" - ")}`;
        } else {
          return values.split(",");
        }
      })) ||
    [];
  console.log("filterValues", filterValues);
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

  //f=Size:200ml,400ml::Fragrance:rose,mint
  //f=Category:candle
  function removeFilter(valueToRemove: string) {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.get("f");
    const updatedQuery = query
      ?.split("::")
      .map((section) => {
        const [key, values] = section.split(":");
        if (valueToRemove.startsWith("Rs.") && key == "Price") {
          console.log("valueToRemove", valueToRemove);
          return null;
        }
        // no value list (single value case)
        if (!values) return null;

        const valueList = values.split(",").map((v) => v.trim());

        if (!valueList.includes(valueToRemove)) {
          return section; // untouched
        }

        const filtered = valueList.filter((v) => v !== valueToRemove);

        // if no values left → remove entire section
        if (filtered.length === 0) return null;

        return `${key}:${filtered.join(",")}`;
      })
      .filter(Boolean)
      .join("::");

    updatedQuery ? params.set("f", updatedQuery) : params.delete("f");
    params.set('page','1')
    router.push(`?${params.toString()}`);
  }

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
