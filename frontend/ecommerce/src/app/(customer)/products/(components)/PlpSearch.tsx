'use client';
import { SelectOptionType } from "@/constants/types";
import { Box, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "@mantine/hooks";


const data: SelectOptionType[] = [
    { label: "Sort By: Price: High to Low", value: "price_desc" },
    { label: "Sort By: Price: Low to High", value: "price_asc" },
    { label: "Sort By: Popularity", value: "popularity_desc" },
    { label: "Sort By: Recommended", value: "trending_desc" },
    { label: "Sort By: Rating", value: "rating_desc" }
]



const PlpSearch = ({ query }: { query?: string }) => {
    const router = useRouter();

    const updateParams = useDebouncedCallback((value: string) => {
        router.push(`/products?q=${value || ''}`);
    }, 500);

    return (
        <Box style={{ display: 'flex', justifyContent: 'center' }} my={24}>
            <TextInput
                w={{ base: '100%', xs: 400 }}
                rightSection={<IconSearch size={18} />}
                placeholder="Search Product"
                defaultValue={query}
                onChange={e => updateParams(e.target.value)}
            />
        </Box>);
}

export default PlpSearch;