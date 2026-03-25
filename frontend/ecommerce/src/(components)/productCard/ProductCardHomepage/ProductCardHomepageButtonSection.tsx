'use client'

import { addOrUpdateCartAction, addToWishListed, getIsWishListed, removeFromWishListed } from "@/app/(customer)/products/[productItemId]/(components)/actions";
import { en } from "@/constants/en";
import { CartItemDbDTO, ProductItem } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import { useSession } from "@/utils/store/session";
import { Grid, GridCol, Button, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconHeartFilled, IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductCardHomepageButtonSection = ({ product }: { product: ProductItem }) => {
    const cartItems = useCartItems();
    const [cartButtonLoader, setCartButtonLoader] = useState<boolean>(false);
    const [wishlistButtonLoader, setWishlistButtonLoader] =
        useState<boolean>(false);
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const session = useSession();
    const isLoggedIn = Boolean(session?.user?.id);
    const productAddedToCart = cartItems.findIndex(ci => ci.productItemId === product.productItemId) !== -1;
    const { addToCart } = useCartActions();

    const getInitialWishlistData = async () => {
        try {
            setWishlistButtonLoader(true);
            const isWishlistedTemp = await getIsWishListed(product.productItemId);
            setIsWishlisted(isWishlistedTemp);
        } catch {
        } finally {
            setWishlistButtonLoader(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn)
            getInitialWishlistData();
    }, [isLoggedIn]);

    const handleAddToCart = async () => {
        try {
            const payload: CartItemDbDTO = {
                productItemId: product.productItemId,
                quantity: 1,
                priceSnapshot: product.sellingPrice,
            };
            if (!isLoggedIn) {
                // notify({
                //   variant: "error",
                //   title: "Error!",
                //   message: "Please log in first!",
                // });
                // return;
            } else {
                setCartButtonLoader(true);
                await addOrUpdateCartAction(payload, 'add');
            }
            addToCart(payload);
            notify({
                variant: "success",
                title: "Success!",
                message: "Item added to cart successfully!"
            });
        } catch (err) {
            notify({
                variant: "error",
                title: "Error!",
                message: "Failed to add item in cart!"
            });
        } finally {
            setCartButtonLoader(false);
        }
    };

    const addToWishlistHandler = async () => {
        try {
            if (!isLoggedIn) {
                notify({
                    variant: "error",
                    title: "Error!",
                    message: "Please log in first before item adding to wishlist!",
                });
                return;
            }
            setWishlistButtonLoader(true);
            await addToWishListed(product.productItemId);
            getInitialWishlistData();
        } catch (err) {
            console.error(err);
            notify({
                variant: "error",
                title: "Error!",
                message: "Failed to add item in wishlist!",
            });
        } finally {
            setWishlistButtonLoader(false);
        }
    };

    const removeFromWishlistHandler = async () => {
        try {
            if (!isLoggedIn) {
                notify({
                    variant: "error",
                    title: "Error!",
                    message: "Please log in first before item removing from wishlist!",
                });
                return;
            }
            setWishlistButtonLoader(true);
            await removeFromWishListed(product.productItemId);
            getInitialWishlistData();
        } catch (err) {
            notify({
                variant: "error",
                title: "Error!",
                message: "Failed to remove item from wishlist!",
            });
        } finally {
            setWishlistButtonLoader(false);
        }
    };

    return (<Grid gutter={8} pb={16}>
        <GridCol span={10}>
            {productAddedToCart ? (
                <Link href="/checkout/cart">
                    <Button color="black.9" size={"md"} fullWidth >
                        {en.goToCart}
                    </Button>
                </Link>
            ) : (
                <Button
                    loading={cartButtonLoader}
                    fullWidth
                    variant="outline"
                    color="black.9"
                    rightSection={<IconPlus size={18} />}
                    size={"md"}
                    onClick={handleAddToCart}
                    styles={{
                        inner: {
                            width: "100%",
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <Text ml={36} fw={500}>
                        {en.addToCart}
                    </Text>
                </Button>
            )}
        </GridCol>
        <GridCol span={2}>
            {isWishlisted ? (
                <ActionIcon variant="outline" color="black.9" h="100%" w="100%" loading={wishlistButtonLoader}
                    onClick={removeFromWishlistHandler}
                >
                    <IconHeartFilled
                        style={{ width: "50%", height: "50%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            ) : (
                <ActionIcon variant="outline" color="black.9" h="100%" w="100%" loading={wishlistButtonLoader}
                    onClick={addToWishlistHandler}
                >
                    <IconHeart style={{ width: "50%", height: "50%" }} stroke={1.5} />
                </ActionIcon>
            )}
        </GridCol>
    </Grid>)
}
export default ProductCardHomepageButtonSection;