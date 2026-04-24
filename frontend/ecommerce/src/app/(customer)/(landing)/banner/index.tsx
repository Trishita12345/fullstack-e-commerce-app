import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Link from "next/link";
import { BannerImageItem } from "@/constants/types";

const BannerItems: BannerImageItem[] = [
  { id: "4", imageUrl: "/assets/Trending.mp4", href: "/products", type: "video" },
  { id: "2", imageUrl: "/assets/Banner2.png", href: "/products", type: "image" },
  { id: "3", imageUrl: "/assets/Banner3.png", href: "/products", type: "image" }
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
            {banner.type === "image" ? (
              <Image
                src={banner.imageUrl}
                width={1920}
                height={1040}
                style={{ width: "100%", height: "auto" }}
                alt={"Banner"}
              />
            ) : (
              <video width="100%" height="auto" autoPlay muted loop>
                <source src={banner.imageUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

          </Link>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default Banner;
