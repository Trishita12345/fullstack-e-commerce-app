import { CategoriesCardType } from "@/(components)/categoriesCard";
import { en } from "@/constants/en";
import {
  Box,
  Grid,
  GridCol,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { apiFetch } from "@/lib/apiFetch";
import { CategoryImageCard } from "@/(components)/categoriesCard/CategoryImageCard";
import { IconArrowRight } from "@tabler/icons-react";

const ShopByCategories = async () => {
  const Categories = await apiFetch<CategoriesCardType[]>(
    "/public/categories/leaf",
    {
      cache: "force-cache",
      revalidate: 60,
    }
  );
  return (
    <Box bg="gray.1" p={{ base: 24, md: 32, lg: 48 }}>
      <Grid justify="space-between" align="center">
        <GridCol span={{ base: 12, md: 3 }}>
          <Stack w={"100%"}>
            <Group align="center">
              <Title
                pb={4}
                order={2}
                fw={600}
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {en.shopByCategories}
              </Title>
              <IconArrowRight />
            </Group>
            <Text
              c="gray.8"
              size="sm"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {en.shopByCategoriesDesc}
            </Text>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 8.5 }}>
          <ScrollArea
            w={"100%"}
            type="always"
            offsetScrollbars
            styles={{
              thumb: { backgroundColor: "var(--mantine-color-primaryDark-5)" },
              scrollbar: {
                height: 6.5,
              },
            }}
          >
            <Box w={"max-content"} pb={24}>
              <Group>
                {Categories.map((item: CategoriesCardType) => (
                  <CategoryImageCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    quantity={item.quantity}
                    image={item.imgUrl}
                  />
                ))}
              </Group>
            </Box>
          </ScrollArea>
        </GridCol>
      </Grid>
    </Box>
  );
};

export default ShopByCategories;
