import FilterRangeSelect from "@/(components)/FilterButton/FilterRangeSelect";
import { Box, RangeSliderValue, Text } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const PriceSlider = ({ minPrice = '0', maxPrice = '5000' }: { minPrice?: string; maxPrice?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (value: RangeSliderValue) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        params.set('minPrice', value[0].toString())
        params.set('maxPrice', value[1].toString())
        router.push(`?${params.toString()}`);
    }

    return (
        <Box px={16} mt={24}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
                Price Range
            </Text>
            <FilterRangeSelect
                onChange={updateFilter}
                domain={[0, 5000]}
                values={[parseInt(minPrice), parseInt(maxPrice)]} //parseInt(minPrice), parseInt(maxPrice)
            />
        </Box>
    )
}
export default PriceSlider;