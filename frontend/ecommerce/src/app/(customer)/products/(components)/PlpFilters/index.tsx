'use client';
import { CategoriesCardType } from "@/(components)/categoriesCard";
import { FacetValue } from "@/constants/types";
import { Divider, Title, Group, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import CategoriesFilter from "./CategoriesFilter";
import VariantsFilter from "./VariantsFilter";
import PriceSlider from "./PriceSlider";
import DiscountsFilter from "./DiscountsFilter";
import React from "react";
import AvailabilityFilter from "./AvailabilityFilter";

interface PlpFilterType {
    facets: Record<string, FacetValue[]>;
    categories: CategoriesCardType[],
    total: number;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    variants?: Record<string, string[]>;
    discount?: string;
}

const PlpFilters = ({ category, facets, categories, minPrice, maxPrice, inStock, variants, discount, total }: PlpFilterType) => {
    const anyFilterApplied = !!(category || minPrice || maxPrice || inStock || (variants && Object.keys(variants).length > 0) || discount);
    const router = useRouter();
    return (
        <>
            <Group justify="space-between">
                <Title order={4} pl={16} tt='uppercase' lts={0.5}>Filters</Title>
                {anyFilterApplied && (
                    <Button variant="transparent" color="primaryDark.9" size="xs" tt='uppercase' onClick={() => router.push('/products')}>
                        Clear Filters
                    </Button>)}
            </Group>
            <Divider my={8} color="gray.1" />
            <CategoriesFilter categories={categories} />
            <Divider my={8} color="gray.1" />
            <PriceSlider minPrice={minPrice} maxPrice={maxPrice} />
            <Divider my={8} color="gray.1" />
            <AvailabilityFilter inStock={inStock} />
            <Divider my={8} color="gray.1" />
            {Object.keys(facets).length > 0 && (
                <>
                    {facets && Object.keys(facets).map((facetKey, idx) => (
                        <React.Fragment key={facetKey}>
                            <VariantsFilter facetKey={facetKey} facetValue={facets[facetKey]} variants={variants} />
                            {idx < Object.keys(facets).length - 1 && <Divider mb={8} mt={12} color="gray.1" />}

                        </React.Fragment>
                    ))}
                    <Divider my={8} color="gray.1" />
                </>
            )}
            <DiscountsFilter discount={discount} />
        </>
    )
}

export default PlpFilters;