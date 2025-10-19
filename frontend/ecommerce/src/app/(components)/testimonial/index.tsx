import {
  Box,
  Grid,
  GridCol,
  Group,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Image from "next/image";

export const Testimonials = () => {
  const reviews = [
    {
      content:
        "The soft glow and soothing fragrance transformed my evening into pure relaxation. A perfect touch of calm for any space",
      imageUrl:
        "https://images.unsplash.com/photo-1760715756584-9a88f2b272c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1760",
      rating: 5,
      by: "Ram Sankar",
    },
    {
      content:
        "The candles aroma filled my home with bliss, creating a cozy, serene vibe. Highly recommended",
      imageUrl:
        "https://images.unsplash.com/photo-1760715756584-9a88f2b272c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=82&w=1760",
      rating: 4,
      by: "Rohit Chauhan",
    },
    {
      content:
        "The gentle scent lingered beautifully, wrapping the room in warmth and peace. It’s my new favorite way to unwind after a long day.",
      imageUrl:
        "https://images.unsplash.com/photo-1760715756584-9a88f2b272c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=84&w=1760",
      rating: 4,
      by: "Shyam Sundar Das",
    },
  ];
  return (
    <Box bg="primary.0" my={4}>
      <Carousel
        withIndicators
        height={400}
        emblaOptions={{
          loop: true,
        }}
      >
        {reviews.map((review) => (
          <CarouselSlide key={review.imageUrl}>
            <Grid grow justify={"space-between"}>
              <GridCol span={6}>
                <Stack
                  h={400}
                  w={{ base: 300, md: "100%" }}
                  pl={{ base: 0, md: 64 }}
                  m={{ base: "auto", md: "none" }}
                  align={"start"}
                  justify={"center"}
                >
                  <Text
                    style={{ fontFamily: "var(--font-allura)" }}
                    size={"2rem"}
                    c={"primaryDark.6"}
                  >
                    Testimonials
                  </Text>
                  <Title order={3} c={"black.6"} w={{ base: 300, md: "70%" }}>
                    {review.content}
                  </Title>
                  <Group justify={"end"} w={"60%"}>
                    <Text c={"primaryDark.3"}> — &nbsp;&nbsp;{review.by}</Text>
                  </Group>
                  <Rating value={review.rating} pt={16} />
                </Stack>
              </GridCol>
              <GridCol span={4} visibleFrom={"md"}>
                <Image
                  src={review.imageUrl}
                  width={700}
                  height={400}
                  alt={review.imageUrl}
                  objectFit={"contain"}
                />
              </GridCol>
            </Grid>
          </CarouselSlide>
        ))}
      </Carousel>
    </Box>
  );
};
