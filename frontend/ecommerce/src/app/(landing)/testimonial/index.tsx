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
import { en } from "@/constants/en";
import { IconQuoteFilled } from "@tabler/icons-react";

export const Testimonials = () => {
  const reviews = [
    {
      content:
        "The soft glow and soothing fragrance transformed my evening into pure relaxation. A perfect touch of calm for any space",
      imageUrl:
        "https://images.unsplash.com/photo-1570823635306-250abb06d4b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      rating: 5,
      by: "Ram Sankar",
    },
    {
      content:
        "The candles aroma filled my home with bliss, creating a cozy, serene vibe. Highly recommended",
      imageUrl:
        "https://images.unsplash.com/photo-1528351655744-27cc30462816?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      rating: 4,
      by: "Rohit Chauhan",
    },
    {
      content:
        "The gentle scent lingered beautifully, wrapping the room in warmth and peace. It’s my new favorite way to unwind after a long day.",
      imageUrl:
        "https://images.unsplash.com/photo-1476900164809-ff19b8ae5968?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      rating: 4,
      by: "Shyam Sundar Das",
    },
  ];
  return (
    <Box bg="primary.0">
      <Carousel
        withIndicators
        height={600}
        emblaOptions={{
          loop: true,
        }}
      >
        {reviews.map((review) => (
          <CarouselSlide key={review.imageUrl}>
            <Grid grow justify={"space-between"}>
              <GridCol span={{ base: 12, md: 6 }}>
                <Stack
                  h={600}
                  w={{ base: 300, xs: "90%" }}
                  pl={{ base: 0, xs: 64 }}
                  m={{ base: "auto", xs: "none" }}
                  align={"start"}
                  justify={"center"}
                  pos={"relative"}
                >
                  {/* <Text
                    pos={"absolute"}
                    top={{ base: "5%", sm: "15%", md: "5%", lg: "15%" }}
                    right={{ base: "4px", sm: "15%" }}
                    c={"primaryDark.6"}
                    style={{
                      fontSize: "4rem",
                    }}
                  >
                    ❜❜
                  </Text> */}
                  <Text
                    pos={"absolute"}
                    top={{ base: "5%", sm: "15%", md: "5%", lg: "15%" }}
                    right={{ base: "4px", sm: "15%" }}
                    c={"primaryDark.6"}
                  >
                    <IconQuoteFilled
                      size={"5rem"}
                      style={{
                        transform: "rotateX(180deg)",
                      }}
                    />
                  </Text>
                  <Text
                    style={{ fontFamily: "var(--font-allura)" }}
                    size={"2rem"}
                    c={"primaryDark.6"}
                  >
                    {en.testimonials}
                  </Text>
                  <Title order={1} c={"black.8"} w={{ base: 300, xs: "70%" }}>
                    {review.content}
                  </Title>
                  <Group justify={"end"} w={"60%"}>
                    <Text c={"primaryDark.3"}> — &nbsp;&nbsp;{review.by}</Text>
                  </Group>
                  <Rating value={review.rating} pt={16} />
                </Stack>
              </GridCol>
              <GridCol span={6} visibleFrom={"xs"}>
                <Image
                  src={review.imageUrl}
                  width={700}
                  height={400}
                  style={{ width: "100%", height: "100%" }}
                  alt={review.imageUrl}
                />
              </GridCol>
            </Grid>
          </CarouselSlide>
        ))}
      </Carousel>
    </Box>
  );
};
