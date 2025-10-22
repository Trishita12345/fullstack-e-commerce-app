import { Box } from "@mantine/core";
import Image from "next/image";

export type ResponsiveImageProps = {
  src: string;
  width?: number;
  height?: number;
};
const ResponsiveImage = ({
  src,
  width = 320,
  height = 320,
}: ResponsiveImageProps) => {
  return (
    <Box w={{ base: "100%", md: width }} h={height}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={src}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default ResponsiveImage;
