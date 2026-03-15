'use client';
import { Box, Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft } from "@tabler/icons-react";
import { Pageable, Sort } from "@/constants/types";
import { useRouter, useSearchParams } from "next/navigation";

interface PLPPaginationProps {
    paginationDetails: {
        totalElements: number;
        totalPages: number;
        pageable: Pageable;
        numberOfElements: number;
        first: boolean;
        last: boolean;
        size: number;
        number: number;
        sort: Sort[];
        empty: boolean;
    }
}
const PLPPagination = ({ paginationDetails }: PLPPaginationProps) => {
    const { totalPages, number, first, last } = paginationDetails;
    const currPage = number + 1;
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateParams = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    }

    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Box style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Group gap={4} style={{
                    cursor: first ? 'default' : 'pointer'
                }}
                    onClick={first ? undefined : () => updateParams(1)}
                >
                    <IconChevronsLeft color={first ? 'gray' : 'black'} />
                    <Text c={first ? 'gray' : 'black'} fw={500} visibleFrom="md">
                        Page 1
                    </Text>
                </Group>
                <Group gap={4}
                    className={`prev-next-button ${first ? '' : 'enabled-prev-next-button'}`}
                    onClick={first ? undefined : () => updateParams(currPage - 1)}
                >
                    <IconChevronLeft color={first ? 'var(--mantine-color-gray-5)' : 'black'} size={'22px'} />
                    <Text c={first ? 'gray' : 'black'} fw={500} visibleFrom="md">
                        Previous
                    </Text>
                </Group>
            </Box>
            <Text c={'black.8'}>
                Page {currPage} of {totalPages}
            </Text>
            <Group gap={4}
                className={`prev-next-button ${last ? '' : 'enabled-prev-next-button'}`}
                onClick={last ? undefined : () => updateParams(currPage + 1)}
            >
                <Text c={last ? 'gray' : 'black'} fw={500} visibleFrom="md">
                    Next
                </Text>
                <IconChevronRight color={last ? 'var(--mantine-color-gray-5)' : 'black'} size={'22px'} />
            </Group>
        </Box >);
}

export default PLPPagination;