import { CategoriesCardType } from "@/(components)/categoriesCard";
import { Radio, Stack, Text } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";

const CategoriesFilter = ({ selectedCategory, categories }: { selectedCategory?: string; categories: CategoriesCardType[] }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (value: any) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('variants');
        params.delete("page");
        params.delete('q');
        params.set('category', value);
        router.push(`?${params.toString()}`);
    }
    return (
        <Radio.Group name="category-filter"
            value={selectedCategory || null}
            onChange={updateFilter}
        >
            <Stack pl={16} pt={8} gap={8}>
                {categories.map((category) => {
                    return (
                        <Radio
                            color='primaryDark.7'
                            size="xs"
                            key={category.id}
                            value={category.name}
                            label={
                                <Text key={category.id} size='sm' fw={500} tt='capitalize'
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    {category.name}
                                </Text >
                            }
                        />
                    )
                })}
            </Stack>
        </Radio.Group>
    );
}

export default CategoriesFilter;