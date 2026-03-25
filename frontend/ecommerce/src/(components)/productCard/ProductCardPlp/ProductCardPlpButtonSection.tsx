'use client'

import { addOrUpdateCartAction } from "@/app/(customer)/products/[productItemId]/(components)/actions";
import { en } from "@/constants/en";
import { CartItemDbDTO, ProductItem } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import { useSession } from "@/utils/store/session";
import { Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";

const ProductCardPlpButtonSection = ({ productItemId, sellingPrice }: { productItemId: string, sellingPrice: number }) => {
    const cartItems = useCartItems();
    const [cartButtonLoader, setCartButtonLoader] = useState<boolean>(false);
    const session = useSession();
    const isLoggedIn = Boolean(session?.user?.id);
    const productAddedToCart = cartItems.findIndex(ci => ci.productItemId === productItemId) !== -1;
    const { addToCart } = useCartActions();

    const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            e.stopPropagation();
            e.preventDefault();
            const payload: CartItemDbDTO = {
                productItemId: productItemId,
                quantity: 1,
                priceSnapshot: sellingPrice,
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

    return (
        <>
            {
                productAddedToCart ? (
                    <Link href="/checkout/cart" style={{ width: '100%' }}>
                        <Button color="black.9" size={"md"} fullWidth>
                            {en.goToCart}
                        </Button>
                    </Link>
                ) : (
                    <Button
                        loading={cartButtonLoader}
                        onClick={handleAddToCart}
                        fullWidth
                        variant="outline"
                        color="black.9"
                        rightSection={<IconPlus size={18} />}
                        size={"md"}
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
        </>
    )
}
export default ProductCardPlpButtonSection;