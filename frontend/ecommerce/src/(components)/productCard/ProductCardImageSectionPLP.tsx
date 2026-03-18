import Image from "next/image";
import { Grid, GridCol, Button, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import "./productCard.css";
import { SearchProductImage } from "@/constants/types";

interface ProductCardImageSectionProps {
    images: SearchProductImage[];
    inStock: boolean;
}
export default function ProductCardImageSectionPLP({ images, inStock }: ProductCardImageSectionProps) {
    const productAddedToCart = false;
    const productAddedToWishList = false;
    const thumbnailImg = images.find((img) => img.isThumbnail);
    const otherImages = images.filter((img) => !img.isThumbnail);
    const carouselImages = [thumbnailImg, ...otherImages];
    return (
        <div className="image-wrapper" style={{ filter: !inStock ? "grayscale(1)" : "" }}>
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
                    <Grid gutter={8}>
                        <GridCol span={10}>
                            {inStock ?
                                <>
                                    {productAddedToCart ? (
                                        <Button color="black.9" variant="outline" size="sm" fullWidth>
                                            Go to Cart
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outline"
                                            color="black.9"
                                            rightSection={<IconPlus size={18} />}
                                            size="sm"
                                        >
                                            <Text ml={36} fw={500}>
                                                Add to Cart
                                            </Text>
                                        </Button>
                                    )}
                                </> :
                                <Button disabled size="sm" fullWidth>
                                    Out of Stock
                                </Button>}
                        </GridCol>

                        <GridCol span={2}>
                            {productAddedToWishList ? (
                                <ActionIcon variant="outline" color="black.9" h="100%" w="100%">
                                    <IconHeartFilled style={{ width: "50%", height: "50%" }} />
                                </ActionIcon>
                            ) : (
                                <ActionIcon variant="outline" color="black.9" h="100%" w="100%">
                                    <IconHeart style={{ width: "50%", height: "50%" }} />
                                </ActionIcon>
                            )}
                        </GridCol>
                    </Grid>
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