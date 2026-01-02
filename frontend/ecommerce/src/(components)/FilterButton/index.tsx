"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  Box,
  Button,
  Divider,
  Drawer,
  Indicator,
  RangeSlider,
  RangeSliderValue,
  Stack,
  Text,
} from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ActionButton } from "../ActionButton";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import FilterMultiSelect from "./FilterMultiSelect";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formattedPrice } from "@/utils/helperFunctions";
import FilterRangeSelect from "./FilterRangeSelect";

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
  const [filter, setFilter] = useState<{ [key: string]: string[] | RangeSliderValue }>({});
  let isFilter = 0;

 console.log('filter', filter)
  //f=Size:200ml,400ml::Fragrance:rose,lavender
  //f=Category:candle
  let defaultFilters = {};
  const params = searchParams.get('f');
  const paramArr = params?.split('::'); //[Size:200ml,400ml, Fragrance:rose,lavender]
  fields.forEach((field: FilterField) => {
    const a = paramArr?.find(p => p.includes(field.field)) //Size:200ml,400ml
    if (a) {
      const b = a.split(':')[1].split(',');
      defaultFilters = { ...defaultFilters, [field.field]: b }
      isFilter += b.length;
    } else {
      defaultFilters = { ...defaultFilters, [field.field]: [] }
    }
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
            onChange={setFilter as Dispatch<SetStateAction<{ [key: string]: string[]; }>>}
            values={filter[field.field] as string[]}
          />
        );
      }
      case "range": {
        return (
          <FilterRangeSelect
            field={field.field}
            onChange={setFilter as Dispatch<SetStateAction<{ [key: string]: RangeSliderValue }>>}
            domain={[0, 5000]}
            values={filter[field.field].length === 0 ? [0,5000] : filter[field.field] as RangeSliderValue}
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
    let tempArr: string[] = [];
    Object.entries(filter).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        return;
      }
      tempArr.push(`${key}:${value.join(',')}`)
    });
    params.set('f', tempArr.join('::'));
    router.push(`?${params.toString()}`);
    close();
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('f');
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
