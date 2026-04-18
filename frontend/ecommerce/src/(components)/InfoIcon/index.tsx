import { en } from "@/constants/en";
import { Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const InfoIcon = ({ info, size = 12 }: { info: string, size?: number }) => {
    return (
        <Tooltip
            withArrow
            arrowSize={6}
            w={200}
            label={
                <Text size="10px" style={{ whiteSpace: "wrap" }} lh={1.5}>
                    {info}
                </Text>
            }
        >
            <IconInfoCircle
                color="var(--mantine-color-dimmed)"
                size={size}
                style={{ cursor: "pointer" }}
            />
        </Tooltip>
    );
};