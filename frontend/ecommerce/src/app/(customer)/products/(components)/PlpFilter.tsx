'use client';
import { CategoriesCardType } from "@/(components)/categoriesCard";
import FilterRangeSelect from "@/(components)/FilterButton/FilterRangeSelect";
import { FacetValue, SelectOptionType } from "@/constants/types";
import { Divider, Radio, Stack, Text, Title, Group, Checkbox, Box } from "@mantine/core";

const discountOptions = [
    { value: '10', label: '10% and above' },
    { value: '20', label: '20% and above' },
    { value: '30', label: '30% and above' },
    { value: '40', label: '40% and above' },
    { value: '50', label: '50% and above' },
    { value: '60', label: '60% and above' },
    { value: '70', label: '70% and above' },
    { value: '80', label: '80% and above' },
]

const CategoriesFilter = ({ categories }: { categories: CategoriesCardType[] }) => {
    return (
        <Radio.Group name="category-filter">
            <Stack pl={16} pt={8} gap={8}>
                {categories.map((category) => (
                    <Radio
                        key={category.id}
                        label={
                            <Text key={category.id} size='sm' fw={500} tt='capitalize'
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {category.name}
                            </Text >
                        }
                    />
                ))}
            </Stack>
        </Radio.Group>
    );
}

const VariantsFilter = ({ facets }: { facets: Record<string, FacetValue[]> }) => {
    return (
        <>
            {facets && Object.keys(facets).map((facetKey, idx) => (
                <>
                    <Stack key={facetKey} mt={24} pl={16} gap={8}>
                        <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} tt='uppercase'>
                            {facetKey}
                        </Text>
                        <Checkbox.Group>
                            <Stack pt={8} gap={8}>
                                {facets[facetKey].map((facetValue) => (
                                    <Checkbox
                                        key={facetValue.value}
                                        label={
                                            <Group gap={4}>
                                                <Text size='sm' fw={500} tt='capitalize'
                                                    style={{ fontFamily: "var(--font-poppins)" }}
                                                >
                                                    {facetValue.value}
                                                </Text>
                                                <Text size='sm' c={'gray.5'}
                                                    style={{ fontFamily: "var(--font-poppins)" }}
                                                >
                                                    ({`${facetValue.count}`})
                                                </Text>
                                            </Group>
                                        }
                                    />
                                ))}
                            </Stack>
                        </Checkbox.Group>
                    </Stack >
                    {idx < Object.keys(facets).length - 1 && <Divider mb={8} mt={12} color="gray.1" />}
                </>
            ))
            }
        </>
    );
}


const DiscountsFilter = ({ discounts }: { discounts: SelectOptionType[] }) => {
    return (
        <Box pl={16} mt={24}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
                Discount Range
            </Text>
            <Radio.Group name="category-filter">
                <Stack gap={8} pt={8}>
                    {discounts.map((discount) => (
                        <Radio
                            key={discount.value}
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
        </Box>
    );
}

const PriceSlider = () =>
    <Box px={16} mt={24}>
        <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
            Price Range
        </Text>
        <FilterRangeSelect
            field={'price'}
            onChange={() => { }}
            domain={[0, 5000]}
            values={[0, 10000]}
        />
    </Box>


const PlpFilter = ({ facets, categories }: { facets: Record<string, FacetValue[]>; categories: CategoriesCardType[] }) => {
    return (
        <>
            <Title order={4} pl={16} tt='uppercase' lts={0.5}>Filters</Title>
            <Divider my={8} color="gray.1" />
            <CategoriesFilter categories={categories} />
            <Divider my={8} color="gray.1" />
            <PriceSlider />
            <Divider my={8} color="gray.1" />
            <VariantsFilter facets={facets} />
            <Divider my={8} color="gray.1" />
            <DiscountsFilter discounts={discountOptions} />
        </>
    )
}

export default PlpFilter;