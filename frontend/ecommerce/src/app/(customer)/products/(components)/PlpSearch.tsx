'use client';
import { Box, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState } from "react";

const PlpSearch = ({ query }: { query?: string }) => {
    const [value, setValue] = useState<string>(query || '');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => { setValue(query || '') }, [query])

    const updateParams = useDebouncedCallback((value: string) => {
        if (query === value) return;
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (value === '') {
            params.delete('q');
        } else {
            params.set('q', value);
        }
        router.push(`?${params.toString()}`);
    }, 500);

    return (
        <Box style={{ display: 'flex', justifyContent: 'center' }} my={24}>
            <TextInput
                w={{ base: '100%', xs: 400 }}
                rightSection={<IconSearch size={18} />}
                placeholder="Search Product"
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                    updateParams(value)
                }}
            />
        </Box>);
}

export default PlpSearch;