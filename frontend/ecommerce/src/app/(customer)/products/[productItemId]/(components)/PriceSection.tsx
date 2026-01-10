import { ProductDetailsDTO } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import { Group, Text } from "@mantine/core";

const PriceSection = ({ pdpData }: { pdpData: ProductDetailsDTO }) => {
  const discount = (
    ((pdpData.basePrice - pdpData.discountedPrice) / pdpData.basePrice) *
    100
  ).toFixed();
  return (
    <>
      {discount ? (
        <Group gap={8}>
          <Text td="line-through" size="lg" c={"dimmed"}>
            {formattedPrice(pdpData.basePrice)}
          </Text>
          <Text size="1.7rem" fw={400} c={"black.8"}>
            {formattedPrice(pdpData.discountedPrice)}
          </Text>
        </Group>
      ) : (
        <Text size="1.7rem" fw={700} c={"black.8"}>
          {formattedPrice(pdpData.basePrice)}
        </Text>
      )}{" "}
    </>
  );
};

export default PriceSection;
