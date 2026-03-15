import Image from "next/image";
import { Grid, GridCol, Button, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import "./productCard.css";
import { SearchProductImage } from "@/constants/types";

interface ProductCardImageSectionProps {
    images: SearchProductImage[];
    productItemId: string;
}
export default function ProductCardImageSection({ images, productItemId }: ProductCardImageSectionProps) {
    const productAddedToCart = false;
    const productAddedToWishList = false;
    const thumbnailImg = images.find((img) => img.isThumbnail);
    const otherImages = images.filter((img) => !img.isThumbnail);
    const carouselImages = [thumbnailImg, ...otherImages];
    return (
        <div className="image-wrapper">
            <Image
                src={thumbnailImg?.imgUrl ?? ''}
                width={280}
                height={280}
                alt="product"
                className="product-static-image"
            />
            <div className="product-carousel-image">
                <div className="css-carousel" style={
                    {
                        "--img-count": carouselImages.length,
                        "--img-width": "280px",
                        "--duration": `${carouselImages.length * 2}s`,
                    } as React.CSSProperties
                }>
                    <div className="css-carousel-track">
                        {carouselImages.map((img: any) => (
                            <div className="css-carousel-slide" key={img.imgUrl}>
                                <Image
                                    src={img.imgUrl}
                                    width={280}
                                    height={280}
                                    alt="product"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hover-actions" style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
                    <div
                        className="carousel-indicators"
                        style={
                            {
                                "--img-count": carouselImages.length,
                                "--duration": `${carouselImages.length * 2}s`,
                                "--activeColor": "var(--mantine-color-primaryDark-7)",
                                "--inactiveColor": "var(--mantine-color-gray-2)"

                            } as React.CSSProperties
                        }
                    >
                        {carouselImages.map((_, i) => (
                            <span key={i} className="carousel-dot" />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}