import {Box} from "@mantine/core";
import Image from 'next/image'
import {Carousel, CarouselSlide} from "@mantine/carousel";
import Link from "next/link";
import {BannerImageItem} from "@/constants/types";

const BannerItems: BannerImageItem[] = [
    {
        imageUrl: "/assets/Banner1.png",
        href: "/featured"
    },
    {
        imageUrl: "/assets/Banner1.png",
        href: "/featured"
    },
    {
        imageUrl: "/assets/Banner1.png",
        href: "/featured"
    }
]
const Banner = () => {
    return (
        <Box w={"100%"} p={0} m={0}>
            <Carousel
                withIndicators
                emblaOptions={{
                    loop: true,
                }}
            >
                {BannerItems.map((banner) => (
                    <CarouselSlide key={banner.imageUrl}>
                        <Link href={banner.href}>
                            <Image
                                src={"/assets/Banner1.png"}
                                width={1920}
                                height={1080}
                                style={{width: "100%", height: "auto"}}
                                alt={"Banner"}
                            />
                        </Link>
                    </CarouselSlide>
                ))}
            </Carousel>

        </Box>
    );
};

export default Banner;
