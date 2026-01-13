import { Box, Stack, Text } from "@mantine/core";
import Image from "next/image";

export type CategoriesCardType = {
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
};
const CategoriesCard = ({ item }: { item: CategoriesCardType }) => {
  console.log("item.imgUrl: ", item.imgUrl);
  return (
    <Stack
      bg="white"
      py={16}
      px={24}
      justify="center"
      gap={16}
      bdrs={3}
      h={330}
    >
      <Text style={{ fontFamily: "var(--font-poppins)" }} size="sm" ta="center">
        {item.name}
      </Text>
      <Box
        w={200}
        h={200}
        bdrs={"50%"}
        style={{ overflow: "hidden" }}
        mx="auto"
      >
        <Image
          src={item.imgUrl}
          width={150}
          height={150}
          alt={"No Img"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
