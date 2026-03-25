'use client'
import { FacetValue } from "@/constants/types"
import { Box, Button, Card, Checkbox, Divider, Group, Modal, Radio, RangeSliderValue, ScrollArea, Stack, Tabs, Text } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react"
import { discountOptions } from "../DiscountsFilter"
import FilterRangeSelect from "@/(components)/FilterButton/FilterRangeSelect"
import { useRouter, useSearchParams } from "next/navigation"
import { useDisclosure } from "@mantine/hooks"
interface FilterType {
    minPrice: string | null,
    maxPrice: string | null,
    discount?: string | null,
    variants?: { [key: string]: string[] },
}

const VariantFilterMobile = ({ options, updateFilter, filter, facetKey }: { options: FacetValue[], updateFilter: React.Dispatch<React.SetStateAction<FilterType>>, filter: FilterType, facetKey: string }) => {
    const handleFilter = (value: string[]) => {
        updateFilter((prev) => ({
            ...prev,
            variants: {
                ...prev.variants,
                [facetKey]: value
            }
        }))
    }
    console.log("selected: ", filter.variants, facetKey, options)
    return (
        <Checkbox.Group value={filter.variants?.[facetKey]} onChange={handleFilter}>
            <Stack>
                {options.map(v => <Checkbox
                    color='primaryDark.7'
                    size='xs'
                    value={v.value}
                    key={v.value}
                    styles={{
                        labelWrapper: {
                            flex: 1
                        }
                    }}
                    label={
                        <Group gap={4} justify="space-between">
                            <Text size='sm' fw={500} tt='capitalize'
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {v.value}
                            </Text>
                            <Text size='sm' c={'gray.5'}
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {`${v.count}`}
                            </Text>
                        </Group>
                    }
                />)}
            </Stack>
        </Checkbox.Group>
    )
}

const DiscountFilterMobile = ({ updateFilter, filter }: { updateFilter: React.Dispatch<React.SetStateAction<FilterType>>, filter: FilterType }) => {
    const handleFilter = (value: string) => {
        updateFilter((prev) => ({
            ...prev,
            discount: value
        }))
    }
    return (

        <Radio.Group name="discount-filter"
            value={filter.discount || null}
            onChange={handleFilter}
        >
            <Stack gap={16}>
                {discountOptions.map((discount) => (
                    <Radio
                        color='primaryDark.7'
                        size="sm"
                        key={discount.value}
                        value={discount.value}
                        label={
                            <Text key={discount.value} size='sm' fw={500} tt='capitalize'
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {discount.label}
                            </Text >
                        }
                    />
                ))}
            </Stack>
        </Radio.Group>
    )
}

const PriceRangeSliderMobile = ({ updateFilter, filter }: { updateFilter: React.Dispatch<React.SetStateAction<FilterType>>, filter: FilterType }) => {
    const { minPrice, maxPrice } = filter;
    const handleFilter = (sliderValue: RangeSliderValue) => {
        updateFilter((prev) => ({
            ...prev,
            minPrice: sliderValue[0].toString(),
            maxPrice: sliderValue[1].toString()
        }))
    }
    return (

        <Box px={8}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
                Price Range
            </Text>
            <FilterRangeSelect
                onChange={handleFilter}
                domain={[0, 50000]}
                values={[parseInt(minPrice || "0"), parseInt(maxPrice || "50000")]}
            />
        </Box>
    )
}

const configureTabValues = (facets: Record<string, FacetValue[]>, updateFilter: React.Dispatch<React.SetStateAction<FilterType>>, filter: FilterType): { value: string, label: string, Component: React.ReactElement }[] => {
    const arr = facets && Object.keys(facets).map((facetKey) => ({
        value: facetKey, label: filter.variants?.[facetKey] ? `${facetKey} (${filter.variants?.[facetKey].length})` : facetKey, Component: <VariantFilterMobile options={facets[facetKey]} updateFilter={updateFilter} filter={filter} facetKey={facetKey} />
    }))
    return [
        { value: 'price', label: 'Price', Component: <PriceRangeSliderMobile updateFilter={updateFilter} filter={filter} /> },
        { value: 'discounts', label: 'Discount', Component: <DiscountFilterMobile updateFilter={updateFilter} filter={filter} /> },
        ...arr
    ]
}

export const PlpMobileFilterTab = ({ facets }: { facets: Record<string, FacetValue[]> }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const variants: { [key: string]: string[] } = {}
    searchParams.getAll("variants").forEach(v => {
        const key = v.split(":")[0] as string;
        const value = v.split(":")[1] as string;
        if (variants.hasOwnProperty(key)) {
            variants[key] = [...variants[key], value];
        } else {
            variants[key] = [value];
        }
    })
    const intialFilter = {
        minPrice: searchParams.get("minPrice"),
        maxPrice: searchParams.get("maxPrice"),
        discount: searchParams.get("discount"),
        variants
    }
    const countModified = useRef(0);
    const [filter, updateFilter] = useState<FilterType>(intialFilter);
    useEffect(() => {
        countModified.current++;
    }, [filter])
    console.log("Filter: ", filter)
    const tabValues: { value: string, label: string, Component: React.ReactElement }[] = configureTabValues(facets, updateFilter, filter);
    const [activeTab, setActiveTab] = useState<string | null>(tabValues[0].value);
    const [opened, { open, close }] = useDisclosure();
    const handleResetFilter = () => {
        if (countModified.current > 1) open()
        else router.push("/products")
    }
    return (
        <Box>
            <Tabs value={activeTab} onChange={setActiveTab} orientation="vertical" color="primaryDark" variant="pills">
                <ScrollArea h={"320px"} style={{ overflow: "scroll" }}>
                    <Tabs.List >
                        {tabValues.map((t, idx) =>
                            <>
                                <Tabs.Tab value={t.value} style={{ padding: '14px' }} key={t.value} bdrs={0}>
                                    {t.label}
                                </Tabs.Tab>
                            </>
                        )}
                    </Tabs.List>
                </ScrollArea>
                {tabValues.map(t =>
                    <Tabs.Panel value={t.value} style={{ padding: '14px', borderLeft: "1px solid var(--mantine-color-gray-2)" }}>
                        <ScrollArea h={"300px"} style={{ overflow: "scroll" }}>
                            {t.Component}
                        </ScrollArea>
                    </Tabs.Panel>
                )}
            </Tabs>
            <Card w="100%" display={'flex'}
                pos={"absolute"}
                bottom={0}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly', zIndex: 100, borderColor: "var(--mantine-color-gray-1)" }}
                shadow="sm"
                hiddenFrom="md"
                py={8}
                withBorder
                bdrs={0}
            >
                <Button variant="transparent" w={'max-content'} onClick={() => {

                }}>
                    <Text tt='uppercase' size='sm' fw={500} c='black.7' onClick={handleResetFilter}>
                        RESET
                    </Text>
                </Button>
                <Divider orientation="vertical" />
                <Button variant="transparent" w={'max-content'} c='primaryDark.7'
                    onClick={() => {
                        const searchParams = new URLSearchParams();
                        filter.minPrice && searchParams.append("minPrice", filter.minPrice)
                        filter.maxPrice && searchParams.append("maxPrice", filter.maxPrice)
                        filter.discount && searchParams.append("discount", filter.discount)
                        filter.variants && Object.keys(filter.variants).forEach(key => {
                            filter.variants?.[key].map(value => searchParams.append("variants", `${key}:${value}`));
                        })
                        router.push("/products?" + searchParams.toString())
                    }}
                >
                    <Text tt='uppercase' size='sm' fw={600}>
                        APPLY
                    </Text>
                </Button>
            </Card >
            <Modal opened={opened} onClose={close} centered title={<Text c={"primary"} >Do you want to discard the changes ?</Text>}>
                <Stack gap={16}>
                    <Text size="12px" lh={1.4}>You modified some filters. What would you like to do with theses changes ?</Text>
                    <Group>
                        <Button variant="outline" onClick={close} color="primary">Go Back</Button>
                        <Button onClick={() => { router.push("/products") }} color="primary">Discard Changes</Button>
                    </Group>
                </Stack>
            </Modal>
        </Box >
    )
}