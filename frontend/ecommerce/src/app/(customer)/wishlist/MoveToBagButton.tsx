"use client"
import { Button, Text } from "@mantine/core";
import { addOrUpdateCartAction, removeFromWishListed } from "../products/[productItemId]/(components)/actions";
import { CartProducts } from "@/constants/types";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/helperFunctions";
import { useState } from "react";
import { useCartActions, useCartItemById } from "@/utils/store/cart";

const MoveToBagButton = ({ isOutOfStock, wishlistedDetails }: { isOutOfStock: boolean; wishlistedDetails: CartProducts }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { addToCart, updateCart } = useCartActions();
    const existingCartItem = useCartItemById(wishlistedDetails.productItemId);
    const handleMoveToCart = async () => {
        if (isOutOfStock) return;
        const payload = {
            priceSnapshot: wishlistedDetails.discountedPrice,
            productItemId: wishlistedDetails.productItemId,
            quantity: 1
        }
        try {
            setLoading(true)
            if (existingCartItem) {
                await addOrUpdateCartAction(payload, 'update')
                updateCart(payload)
            } else {
                await addOrUpdateCartAction(payload, 'add');
                addToCart(payload);
            }
            await removeFromWishListed(wishlistedDetails.productItemId);
            router.push('/checkout/cart')
            notify({
                message: "Successfully moved from wishlisted to Cart",
                variant: "success",
                title: "Success"
            })
        } catch {
            notify({
                message: "Failed to move from wishlisted to Cart",
                variant: "error",
                title: "Error"
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button loading={loading} variant="transparent" onClick={handleMoveToCart} fullWidth >
            <Text py={8} ta={"center"} size="sm" tt="uppercase"
                c={isOutOfStock ? "dimmed" : "primaryDark.7"} fw={isOutOfStock ? 600 : 500}

            >
                {isOutOfStock ? "Out of Stock" : "Move To Bag"}
            </Text>
        </Button>
    );
}

export default MoveToBagButton;