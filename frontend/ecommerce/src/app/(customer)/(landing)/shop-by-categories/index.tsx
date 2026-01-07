import CategoriesCard, {
  CategoriesCardType,
} from "@/(components)/categoriesCard";
import { en } from "@/constants/en";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { apiFetch } from "@/lib/apiFetch";

const ShopByCategories = async () => {
  const Categories = await apiFetch<CategoriesCardType[]>(
    "/public/categories/leaf",
    {
      cache: "force-cache",
      revalidate: 60,
    }
  );
  return (
    <Box bg="gray.1" p={48}>
      <Grid justify="space-between" align="center">
        <GridCol span={{ base: 12, md: 2.5 }}>
          <Stack w={"100%"}>
            <Title order={2} fw={500}>
              {en.shopByCategories}
            </Title>
            <Text c="gray.8" size="sm">
              {en.shopByCategoriesDesc}
            </Text>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 8, lg: 9 }}>
          <Carousel
            slideSize={{
              base: "70%",
              xs: "50%",
              sm: "33.333333%",
              lg: "25%",
              xl: "20%",
            }}
            slideGap={"md"}
            emblaOptions={{ loop: true, align: "start" }}
            withControls={true}
          >
            {Categories.map((item: CategoriesCardType) => (
              <CarouselSlide key={item.id}>
                <CategoriesCard item={item} />
              </CarouselSlide>
            ))}
          </Carousel>
        </GridCol>
      </Grid>
    </Box>
  );
};

export default ShopByCategories;
