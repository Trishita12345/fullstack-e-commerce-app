"use client"
import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { removeFromWishListed } from "../products/[productItemId]/(components)/actions";

const RemoveWishlistIcon = ({ productItemId }: { productItemId: string }) => {
    return (
        <ActionIcon
            radius={"lg"}
            style={{
                position: "absolute",
                right: 8,
                top: 8,
                backgroundColor: "white",
                opacity: ".3"
            }}
            onClick={(e) => { e.preventDefault(); removeFromWishListed(productItemId); }}>
            <IconX color="black" />
        </ActionIcon>
    );
}

export default RemoveWishlistIcon;