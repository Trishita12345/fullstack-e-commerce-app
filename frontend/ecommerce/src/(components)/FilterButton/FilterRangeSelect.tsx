'use client';

import { formattedPrice } from "@/utils/helperFunctions";
import { Stack, RangeSlider, Text, RangeSliderValue } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Dispatch, SetStateAction, useState } from "react";

interface FilterMultiSelectProps {
  field: string;
  values: RangeSliderValue;
  domain: [number, number];
  // step: number;
  onChange: Dispatch<
    SetStateAction<{
      [key: string]: RangeSliderValue;
    }>
  >;
}

const FilterRangeSelect = ({
  field,
  onChange,
  values,
  domain,
  // step
}: FilterMultiSelectProps) => {
  const step = domain[1] / 100;
  const [sliderValue, setSliderValue] = useState<RangeSliderValue>([values[0] / step, values[1] / step]);

  const updateFilter = useDebouncedCallback(() => {
    onChange(prev => ({ ...prev, [field]: [sliderValue[0] * step, sliderValue[1] * step] }));
  }, 500)

  const handleChange = (value: RangeSliderValue) => {
    console.log(value);
    setSliderValue(value);
    updateFilter()
  };
  return (
    <Stack m={0}>
      <RangeSlider
        domain={[domain[0] / step, domain[1] / step]}
        value={sliderValue}
        onChange={handleChange}
        label={null}
        color="primaryDark.7"
      />
      <Text size="xs" fw={500}>{`${formattedPrice(sliderValue[0] * step)} - ${formattedPrice(sliderValue[1] * step)}`}</Text>
    </Stack>
  )
};

export default FilterRangeSelect;
