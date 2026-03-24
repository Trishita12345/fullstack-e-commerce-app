'use client';
import { Box, Stack, Select, Group, Text } from "@mantine/core";
import { Icon, IconArrowsSort, IconBrandTinder, IconHeart, IconProps, IconSortAscending, IconSortDescending, IconStar } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SortingDataType {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    label: string;
    value: string;
};
const sortingData: SortingDataType[] = [
    { icon: IconBrandTinder, label: "Sort By: Popularity", value: "popularity_desc" },
    { icon: IconStar, label: "Sort By: Trending", value: "trending_desc" },
    { icon: IconSortDescending, label: "Sort By: Price: High to Low", value: "price_desc" },
    { icon: IconSortAscending, label: "Sort By: Price: Low to High", value: "price_asc" },
    { icon: IconHeart, label: "Sort By: Customer Rating", value: "rating_desc" }
]



const PlpSorting = ({ isMobile = false, handleClose }: { isMobile?: boolean; handleClose?: () => void }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortBy = searchParams.get('sortBy')
    const dir = searchParams.get('dir')
    const currValue = sortBy && dir ? `${sortBy}_${dir}` : "tre nding_desc";

    const val = sortingData.some((d) => d.value === currValue)
        ? currValue
        : "trending_desc";

    const updateParams = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const [sortBy, dir] = value.split("_");
        params.delete("page");
        params.set("sortBy", sortBy);
        params.set("dir", dir);
        router.push(`?${params.toString()}`);
    }
    return (
        <>
            {isMobile ?
                <Stack p={16}>
                    {sortingData.map(s => {
                        const Icon = s.icon;
                        return (
                            <Group onClick={() => {
                                updateParams(s.value);
                                handleClose && handleClose();
                            }
                            }>
                                <Icon size='18px' />
                                <Text size='sm' style={{ fontFamily: "var(--font-poppins)" }}>{s.label}</Text>
                            </Group>
                        )
                    }
                    )}
                </Stack > :
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }} visibleFrom="md">
                    <Select
                        size='xs'
                        w={250}
                        leftSection={<IconArrowsSort size={14} />}
                        allowDeselect={false}
                        clearable={false}
                        data={sortingData}
                        defaultValue={val}
                        onChange={(_value, option) => updateParams(option.value)}
                    />
                </Box>
            }
        </>);
}

export default PlpSorting;