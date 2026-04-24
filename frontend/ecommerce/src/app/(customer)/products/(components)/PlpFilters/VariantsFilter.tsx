import { FacetValue } from "@/constants/types";
import { Stack, Checkbox, Group, Divider, Text } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";

const VariantsFilter = ({ facetKey, facetValue, variants }: { facetKey: string, facetValue: FacetValue[], variants?: Record<string, string[]> }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const variantsWithCurrentKey = variants ?
        (Array.isArray(variants) ? variants : [variants]).filter(v => v.startsWith(`${facetKey}:`))
        : [];


    const updateFilter = (key: string, values: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");

        const existingVariants = params.getAll('variants') // ['Size:OneSize', 'Size:100gm', 'Color:Red', 'Color:Blue']
            .filter(v => !v.startsWith(`${key}:`)) // ['Size:OneSize', 'Size:OneSize', 'Color:Red', 'Color:Blue'] => ['Color:Red', 'Color:Blue']

        params.delete('variants');
        existingVariants.forEach(v => params.append('variants', v)); // 'Color:Red' and 'Color:Blue'
        values?.forEach(value => {
            params.append('variants', `${key}:${value}`);
        });
        router.push(`?${params.toString()}`);
    }

    return (
        <Stack mt={24} pl={16} gap={8}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} tt='uppercase'>
                {facetKey}
            </Text>
            <Checkbox.Group onChange={(values) => updateFilter(facetKey, values)} value={variantsWithCurrentKey.map(v => v.split(':')[1])}>
                <Stack pt={8} gap={8}>
                    {facetValue.map((v) => (
                        <Checkbox
                            color='primaryDark.7'
                            size='xs'
                            value={v.value}
                            key={v.value}
                            label={
                                <Group gap={4}>
                                    <Text size='sm' fw={500} tt='capitalize'
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                    >
                                        {v.value}
                                    </Text>
                                    <Text size='sm' c={'gray.5'}
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                    >
                                        ({`${v.count}`})
                                    </Text>
                                </Group>
                            }
                        />
                    ))}
                </Stack>
            </Checkbox.Group>

        </Stack >

    );
}

export default VariantsFilter;