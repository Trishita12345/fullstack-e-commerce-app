import { SelectOptionType } from "@/constants/types";
import { Box, Radio, Stack, Text } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";

const discountOptions: SelectOptionType[] = [
    { value: 'gte10', label: '10% and above' },
    { value: 'gte20', label: '20% and above' },
    { value: 'gte30', label: '30% and above' },
    { value: 'gte40', label: '40% and above' },
    { value: 'gte50', label: '50% and above' },
    { value: 'gte60', label: '60% and above' },
    { value: 'gte70', label: '70% and above' },
    { value: 'gte80', label: '80% and above' },
]

const DiscountsFilter = ({ discount }: { discount?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        params.set('discount', value);
        router.push(`?${params.toString()}`);
    }
    return (
        <Box pl={16} mt={24}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
                Discount Range
            </Text>
            <Radio.Group name="discount-filter"
                value={discount || null}
                onChange={updateFilter}
            >
                <Stack gap={8} pt={8}>
                    {discountOptions.map((discount) => (
                        <Radio
                            color='primaryDark.7'
                            size="xs"
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
        </Box>
    );
}

export default DiscountsFilter;