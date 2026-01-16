import { CartItemDTO, CartProductsDTO, CartProducts } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/utils/helperFunctions";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import { ActionIcon, Box, Card, Grid, Group, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface CartItemsSectionProps {
  cartProducts: CartProductsDTO;
}

interface CartItemCardProps {
  cartItem: CartItemDTO;
  productItem: CartProducts;
}

const CartItemCard = ({ cartItem, productItem }: CartItemCardProps) => {
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const { removeFromCart } = useCartActions();
  const handleRemoveFromCart = async (productItemId: string) => {
    try {
      setLoading(true);
      if (isLoggedIn) {
        await apiFetch<void>(
          `/cart-service/cart-items/delete/${productItemId}`,
          {
            method: "DELETE",
          }
        );
      }
      removeFromCart(productItemId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Item removed from cart successfully!",
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      withBorder
      shadow="sm"
      radius="sm"
      styles={{
        root: { border: "1px solid var(--mantine-color-black-1)" },
      }}
    >
      <Box
        display={"flex"}
        style={{
          gap: "16px",
          alignItems: "start",
        }}
      >
        <Image
          src={productItem.imgUrl}
          height={120}
          width={90}
          alt={productItem.productName}
        />
        <Group justify="space-between" w="100%">
          <Stack>
            <Text>{productItem.productName}</Text>
          </Stack>
          <ActionIcon
            variant="transparent"
            onClick={() => handleRemoveFromCart(productItem.productItemId)}
          >
            <IconTrash color="var(--mantine-color-primaryDark-5)" size={18} />
          </ActionIcon>
        </Group>
      </Box>
    </Card>
  );
};

const CartItemsSection = ({ cartProducts }: CartItemsSectionProps) => {
  const cartItems = useCartItems();
  return (
    <>
      {cartItems.map((c) => {
        return (
          <CartItemCard
            key={c.productItemId}
            cartItem={c}
            productItem={cartProducts[c.productItemId]}
          />
        );
      })}
    </>
  );
};

export default CartItemsSection;
