"use client";

import { useState } from "react";

import "swiper/css";
import "swiper/css/thumbs";
import { ActionIcon, Box, Group } from "@mantine/core";
import ResponsiveImage from "../responsiveImage";
import "./imageGallery.css";
import { useViewportSize } from "@mantine/hooks";
import { IconShare } from "@tabler/icons-react";
import { shareProduct } from "@/utils/helperFunctions";
import { ShareProductType } from "@/app/(customer)/products/[productItemId]/(components)/ImageComponent";

export default function ImageGallery({
  images,
  product,
}: {
  images: string[];
  product: ShareProductType;
}) {
  const [thumbnail, setThumbnail] = useState<number>(0);
  const { width } = useViewportSize();

  return (
    <Box maw={width > 1349 ? 464 : 386}>
      <Box style={{ position: "relative" }}>
        <ResponsiveImage
          src={images[thumbnail]}
          height={width > 1349 ? 464 : 386}
          width={width > 1349 ? 464 : 386}
        />
        <ActionIcon
          aria-label="share"
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
      <Group mt={20} gap={16}>
        {images.map((src, i) => (
          <Box
            key={src}
            className="imgCard"
            maw={80}
            onMouseEnter={() => {
              setThumbnail(i);
            }}
            style={{ cursor: "pointer" }}
          >
            <ResponsiveImage src={src} height={80} width={80} />
          </Box>
        ))}
      </Group>
    </Box>
  );
}
