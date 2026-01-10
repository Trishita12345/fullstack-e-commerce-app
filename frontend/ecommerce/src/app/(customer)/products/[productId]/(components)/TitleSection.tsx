import { ProductDetailsDTO } from "@/constants/types";
import { Stack, Badge, Title } from "@mantine/core";

const TitleSection = ({ pdpData }: { pdpData: ProductDetailsDTO }) => {
  const discount = (
    ((pdpData.basePrice - pdpData.discountedPrice) / pdpData.basePrice) *
    100
  ).toFixed();
  return (
    <Stack>
      {discount && (
        <Badge size="md" color={"primaryDark.5"} bdrs={0} px={18} py={10}>
          {`${discount}% Off`}
        </Badge>
      )}

      <Title order={3} lts={0.7} c={"black.8"}>
        {pdpData.productName}
      </Title>
    </Stack>
  );
};

export default TitleSection;
