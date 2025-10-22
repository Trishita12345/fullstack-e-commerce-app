import { Box, Stack, Text } from "@mantine/core";
import ResponsiveImage from "../responsiveImage";

export type CategoriesCardType = {
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
};
const CategoriesCard = ({ item }: { item: CategoriesCardType }) => {
  return (
    <Stack bg="white" py={32} px={8} justify="center" gap={16} bdrs={3}>
      <Text style={{ fontFamily: "var(--font-poppins)" }} size="sm" ta="center">
        {item.name}
      </Text>
      <Box
        w={100}
        h={100}
        bdrs={"50%"}
        style={{ overflow: "hidden" }}
        mx="auto"
      >
        <ResponsiveImage src={item.imgUrl} width={100} height={100} />
      </Box>
      <Text
        style={{ fontFamily: "var(--font-poppins)" }}
        size="xs"
        fw={600}
        ta="center"
        c="black.5"
      >
        {item.quantity}&nbsp;{item.quantity > 1 ? "items" : "item"}
      </Text>
    </Stack>
  );
};

export default CategoriesCard;
