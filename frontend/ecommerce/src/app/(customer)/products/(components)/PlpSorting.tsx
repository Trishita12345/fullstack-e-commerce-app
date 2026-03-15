'use client';
import { SelectOptionType } from "@/constants/types";
import { Box, ComboboxData, ComboboxItem, Select } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const data: SelectOptionType[] = [
    { label: "Sort By: Price: High to Low", value: "price_desc" },
    { label: "Sort By: Price: Low to High", value: "price_asc" },
    { label: "Sort By: Popularity", value: "popularity_desc" },
    { label: "Sort By: Recommended", value: "trending_desc" },
    { label: "Sort By: Rating", value: "rating_desc" }
]



const PlpSorting = ({ sortBy, dir }: { sortBy?: string, dir?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currValue = sortBy && dir ? `${sortBy}_${dir}` : "trending_desc";

    const val = data.some((d) => d.value === currValue)
        ? currValue
        : "trending_desc";

    const updateParams = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const [sortBy, dir] = value.split("_");
        params.set("page", '1');
        params.set("sortBy", sortBy);
        params.set("dir", dir);
        router.push(`?${params.toString()}`);
    }
    return (
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Select
                size='xs'
                w={250}
                leftSection={<IconArrowsSort size={14} />}
                allowDeselect={false}
                clearable={false}
                data={data}
                defaultValue={val}
                onChange={(_value, option) => updateParams(option.value)}
            />
        </Box>);
}

export default PlpSorting;