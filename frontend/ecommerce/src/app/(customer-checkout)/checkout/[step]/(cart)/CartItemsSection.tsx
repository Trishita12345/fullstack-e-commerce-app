import { CartProductsDTO } from "@/constants/types";
import { useCartItems } from "@/utils/store/cart";
import CartItemCard from "./(CartItemCard)";
import { Box, Text } from "@mantine/core";

interface CartItemsSectionProps {
  cartProducts: CartProductsDTO;
  showLoading: () => void;
  stopLoading: () => void;
}

const CartItemsSection = ({
  cartProducts,
  showLoading,
  stopLoading,
}: CartItemsSectionProps) => {
  const cartItems = useCartItems();
  const noOfSelected = cartItems.filter((ci) => ci.isSelected).length;
  const noOfCartItems = cartItems.length;
  return (
    <Box>
      <Text
        pt={16}
        pb={12}
        tt="uppercase"
        fw={600}
        c="primaryDark.9"
      >{`${noOfSelected}/${noOfCartItems} items Selected`}</Text>
      {cartItems.map((c) => {
        return (
          <CartItemCard
            key={c.productItemId}
            cartItem={c}
            productItem={cartProducts[c.productItemId]}
            stopLoading={stopLoading}
            showLoading={showLoading}
          />
        );
      })}
    </Box>
  );
};

export default CartItemsSection;
