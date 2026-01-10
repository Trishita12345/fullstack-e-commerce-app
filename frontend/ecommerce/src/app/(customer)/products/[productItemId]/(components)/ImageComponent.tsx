"use client";

import ImageCarousel from "@/(components)/ImageCarousel";
import ImageGallery from "@/(components)/ImageGallery";
import { useViewportSize } from "@mantine/hooks";

export interface ShareProductType {
  name: string;
  id: string;
}

const ImageComponent = ({
  images,
  product,
}: {
  images: string[];
  product: ShareProductType;
}) => {
  const { height, width } = useViewportSize();
  return (
    <>
      {width > 767 ? (
        <ImageGallery images={images} product={product} />
      ) : (
        <ImageCarousel images={images} product={product} />
      )}
    </>
  );
};

export default ImageComponent;
