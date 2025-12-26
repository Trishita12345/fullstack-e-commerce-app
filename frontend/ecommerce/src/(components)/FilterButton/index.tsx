"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  Box,
  Button,
  Divider,
  Drawer,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ActionButton } from "../ActionButton";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import FilterMultiSelect from "./FilterMultiSelect";
import { useEffect, useState } from "react";

export type FilterField = {
  options: any[];
  label: string;
  type: "multiSelect" | "singleSelect" | "range";
  field: string;
};
export const FilterButton = ({ fields }: { fields: FilterField[] }) => {
  const router = useRouter();
  const { height } = useViewportSize();
  const [opened, { open, close }] = useDisclosure(false);
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<{ [key: string]: string[] }>({});
  let isFilter = 0;

  let defaultFilters = {};
  fields.forEach((field: FilterField) => {
    const values = searchParams.get(field.field)?.split(",") ?? [];
    isFilter += values.length;
    defaultFilters = { ...defaultFilters, [field.field]: values };
  });
  useEffect(() => {
    setFilter(defaultFilters);
  }, [searchParams]);

  const SubComponent = ({ field }: { field: FilterField }) => {
    switch (field.type) {
      case "multiSelect": {
        return (
          <FilterMultiSelect
            options={field.options}
            field={field.field}
            onChange={setFilter}
            values={filter[field.field]}
          />
        );
      }
      default: {
        return <></>;
      }
    }
  };
  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filter).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        params.delete(key);
        return;
      }
      params.set(key, value.join(","));
    });
    router.push(`?${params.toString()}`);
    close();
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(filter).forEach((key) => {
      params.delete(key);
    });
    router.push(`?${params.toString()}`);
    close();
  };
  return (
    <>
      <Drawer
        size={"lg"}
        opened={opened}
        position="right"
        onClose={() => {
          close();
          setFilter(defaultFilters);
        }}
        title={
          <Text fw={700} size="xl">
            Filter By
          </Text>
        }
        styles={{
          content: {
            padding: "8px 24px",
          },
          body: {
            height: height - 180,
            paddingX: 24,
          },
          header: {
            paddingLeft: 28,
            paddingRight: 28,
            paddingBottom: 0,
            paddingTop: 0,
          },
        }}
      >
        <Accordion
          defaultValue={fields[0].label}
          h={"100%"}
          style={{ overflowY: "auto" }}
          styles={{
            content: {
              maxHeight: height > 400 ? 250 : 150,
              overflowY: "scroll",
            },
          }}
        >
          {fields.map((item: FilterField, index) => (
            <Accordion.Item
              style={{ borderBottom: "1px solid #ebebeb" }}
              mt={index == 0 ? 0 : 12}
              key={item.label}
              value={item.label}
            >
              <Accordion.Control>{item.label}</Accordion.Control>
              <Accordion.Panel>
                <SubComponent field={item} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Box
          pos="absolute"
          bottom={16}
          w="90%"
          left="50%"
          style={{ transform: "translateX(-50%)" }}
        >
          <Stack gap={2}>
            <Button color="black" fullWidth onClick={handleApplyFilter}>
              <Text tt="uppercase" size="xs" fw={500} lts={0.7}>
                Apply Filter
              </Text>
            </Button>

            <Button
              color="black"
              variant="subtle"
              fullWidth
              onClick={clearFilter}
            >
              <Text tt="uppercase" size="xs" fw={500} lts={0.7}>
                Clear Filter
              </Text>
            </Button>
          </Stack>
        </Box>
      </Drawer>
      {isFilter ? (
        <Indicator label={isFilter} size={20} color={"primaryDark.6"}>
          <ActionButton
            onClick={open}
            Icon={<IconAdjustmentsHorizontal size={"16"} />}
            label={"Filter By"}
            size="xs"
          />
        </Indicator>
      ) : (
        <ActionButton
          onClick={open}
          Icon={<IconAdjustmentsHorizontal size={"16"} />}
          label={"Filter By"}
          size="xs"
        />
      )}
    </>
  );
};
