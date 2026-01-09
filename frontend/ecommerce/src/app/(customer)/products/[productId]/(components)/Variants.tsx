import { ProductDetailsDTO } from "@/constants/types";
import VariantAttributes from "./VariantAttributes";
import { Stack } from "@mantine/core";

const Variants = ({ pdpData }: { pdpData: ProductDetailsDTO }) => {
  return (
    <Stack gap={28}>
      {pdpData.variantAttributes
        .filter((va) => va.attributes.length > 1)
        .map((va) => (
          <VariantAttributes va={va} key={va.variantName} />
        ))}
    </Stack>
  );
};

export default Variants;
