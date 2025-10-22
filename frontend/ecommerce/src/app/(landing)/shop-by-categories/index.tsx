import CategoriesCard, {
  CategoriesCardType,
} from "@/(components)/categoriesCard";
import { en } from "@/constants/en";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Box, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";

const Categories: CategoriesCardType[] = [
  {
    id: "1",
    name: "Jar Candle",
    imgUrl:
      "https://images.unsplash.com/photo-1643122966696-a67c288b39d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGphciUyMGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 4,
  },
  {
    id: "2",
    name: "3 Wicked candle",
    imgUrl:
      "https://images.unsplash.com/photo-1602607203475-c5e99918dfc5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 1,
  },
  {
    id: "3",
    name: "Candle Set",
    imgUrl:
      "https://images.unsplash.com/photo-1603905179139-db12ab535ca9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhbmRsZXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 2,
  },
  {
    id: "4",
    name: "Jar Candle",
    imgUrl:
      "https://images.unsplash.com/photo-1643122966696-a67c288b39d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGphciUyMGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 4,
  },
  {
    id: "5",
    name: "3 Wicked candle",
    imgUrl:
      "https://images.unsplash.com/photo-1602607203475-c5e99918dfc5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 1,
  },
  {
    id: "6",
    name: "Candle Set",
    imgUrl:
      "https://images.unsplash.com/photo-1603905179139-db12ab535ca9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhbmRsZXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=900",
    quantity: 2,
  },
];
const ShopByCategories = () => {
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
