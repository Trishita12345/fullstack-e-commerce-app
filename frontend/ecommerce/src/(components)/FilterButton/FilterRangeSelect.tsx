'use client';

import { formattedPrice } from "@/utils/helperFunctions";
import { Stack, RangeSlider, Text, RangeSliderValue } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface FilterMultiSelectProps {
  values: RangeSliderValue;
  domain: [number, number];
  onChange: (sliderValue: RangeSliderValue) => void
}

const FilterRangeSelect = ({
  onChange,
  values,
  domain,
}: FilterMultiSelectProps) => {
  const step = domain[1] / 100;
  const [sliderValue, setSliderValue] = useState<RangeSliderValue>([values[0] / step, values[1] / step]);

  useEffect(() => {
    setSliderValue([values[0] / step, values[1] / step])
  }, [values])

  const updateFilter = useDebouncedCallback(() => {
    // onChange((prev: RangeSliderValue) => ({ ...prev, [field]: [sliderValue[0] * step, sliderValue[1] * step] }));
    onChange([sliderValue[0] * step, sliderValue[1] * step])
  }, 500)

  const handleChange = (value: RangeSliderValue) => {
    setSliderValue(value);
    updateFilter()
  };
  return (
    <Stack m={0}>
      <RangeSlider
        styles={{
          track: {
            height: '2px'
          },
          thumb: {
            height: 12,
            width: 12,
            border: '4px solid var(--mantine-color-primaryDark-7)',
          }
        }}
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
