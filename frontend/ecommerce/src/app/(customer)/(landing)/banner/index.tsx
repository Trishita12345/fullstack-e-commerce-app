import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Link from "next/link";
import { BannerImageItem } from "@/constants/types";

const BannerItems: BannerImageItem[] = [
  {
    id: "1",
    imageUrl: "/assets/Banner1.png",
    href: "/featured",
  },
  { id: "2", imageUrl: "/assets/Banner1.png", href: "/featured" },
  { id: "3", imageUrl: "/assets/Banner1.png", href: "/featured" },
];
const Banner = () => {
  return (
    <Carousel
      withIndicators
      emblaOptions={{
        loop: true,
      }}
    >
      {BannerItems.map((banner) => (
        <CarouselSlide key={banner.id}>
          <Link href={banner.href}>
            <Image
              src={"/assets/Banner1.png"}
              width={1920}
              height={1080}
              style={{ width: "100%", height: "auto" }}
              alt={"Banner"}
            />
          </Link>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default Banner;
