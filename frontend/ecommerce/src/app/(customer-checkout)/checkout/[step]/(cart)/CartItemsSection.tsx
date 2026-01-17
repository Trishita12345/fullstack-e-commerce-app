import { CartProductsDTO } from "@/constants/types";
import { useCartItems } from "@/utils/store/cart";
import CartItemCard from "./CartItemCard";

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
  return (
    <>
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
    </>
  );
};

export default CartItemsSection;
