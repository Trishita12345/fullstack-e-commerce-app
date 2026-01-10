import { Carousel } from "@mantine/carousel";
import ResponsiveImage from "../responsiveImage";
import classes from "./ImageCarousel.module.css";
import { ActionIcon, Box } from "@mantine/core";
import { shareProduct } from "@/utils/helperFunctions";
import { IconShare } from "@tabler/icons-react";
import { ShareProductType } from "@/app/(customer)/products/[productId]/(components)/ImageComponent";

export default function ImageCarousel({
  images,
  product,
}: {
  images: string[];
  product: ShareProductType;
}) {
  return (
    <Carousel
      classNames={classes}
      withIndicators
      height={350}
      emblaOptions={{ dragFree: true, align: "start", loop: true }}
      slideGap="0"
      withControls={false}
    >
      {images.map((src) => (
        <Carousel.Slide key={src}>
          <Box maw={350} mx={"auto"} style={{ position: "relative" }}>
            <ResponsiveImage src={src} height={350} width={350} />
            <ActionIcon
              onClick={() => shareProduct(product)}
              variant="filled"
              c="white"
              bg="#00000070"
              bdrs={"50px!important"}
              style={{ position: "absolute", top: 4, right: 4 }}
            >
              <IconShare size={16} />
            </ActionIcon>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
