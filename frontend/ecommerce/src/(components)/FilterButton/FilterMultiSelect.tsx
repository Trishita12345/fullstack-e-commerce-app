"use client";

import { SelectOptionType } from "@/constants/types";
import { Checkbox, Group, Stack } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface FilterMultiSelectProps {
  options: any[];
  field: string;
  values: string[];
  onChange: Dispatch<
    SetStateAction<{
      [key: string]: string[];
    }>
  >;
}
const FilterMultiSelect = ({
  options,
  field,
  onChange,
  values,
}: FilterMultiSelectProps) => {
  const handleChange = (value: string[]) => {
    onChange({ [field]: value });
  };

  return (
    <Checkbox.Group defaultValue={values} onChange={handleChange}>
      <Stack mt="xs">
        {options.map((o: SelectOptionType) => (
          <Checkbox
            key={o.value}
            value={o.value}
            label={o.label}
            color={"primaryDark.7"}
          />
        ))}
      </Stack>
    </Checkbox.Group>
  );
};

export default FilterMultiSelect;
