import { PopoverContentItemProps } from "@/constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Text } from "@mantine/core";
import Link from "next/link";

const PopoverContentItems = ({
  href,
  icon,
  label,
}: PopoverContentItemProps) => {
  return (
    <Link href={href}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          height: 40,
          gap: 8,
        }}
      >
        <FontAwesomeIcon icon={icon} size="sm" />
        <Text size="xs">{label}</Text>
      </Box>
    </Link>
  );
};

export default PopoverContentItems;
