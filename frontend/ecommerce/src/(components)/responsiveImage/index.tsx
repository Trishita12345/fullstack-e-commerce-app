import { Box } from "@mantine/core";
import Image from "next/image";

export type ResponsiveImageProps = {
  src: string;
  width?: number;
  height?: number;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
};
const ResponsiveImage = ({
  src,
  width = 320,
  height = 320,
  objectFit = "fill",
}: ResponsiveImageProps) => {
  return (
    <Box w={{ base: "100%", md: width }} h={height}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={"No Img"}
        style={{ width: "100%", height: "100%", objectFit }}
      />
    </Box>
  );
};

export default ResponsiveImage;
