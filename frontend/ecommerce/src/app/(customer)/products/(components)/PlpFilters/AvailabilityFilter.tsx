import { Box, Checkbox, Text } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";

const AvailabilityFilter = ({ inStock }: { inStock?: boolean }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (value: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (value) {
            params.set('inStock', value.toString());
        } else {
            params.delete('inStock')
        }
        router.push(`?${params.toString()}`);
    }
    return (
        <Box pl={16} mt={24}>
            <Text size='sm' fw={600} style={{ fontFamily: "var(--font-poppins)" }} pb={8} tt='uppercase'>
                Availability
            </Text>
            <Checkbox
                pt={8}
                color='primaryDark.7'
                size='xs'
                checked={inStock || false}
                onChange={e => updateFilter(e.target.checked)}
                label={
                    <Text size='sm' fw={500} tt='capitalize'
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Show only in stock items
                    </Text>
                }
            />
        </Box>
    );
}

export default AvailabilityFilter;