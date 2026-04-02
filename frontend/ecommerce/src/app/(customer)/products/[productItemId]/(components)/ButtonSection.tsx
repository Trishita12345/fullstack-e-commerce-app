"use client";
import {
  CartItemDbDTO,
  CartItemDTO,
  ProductDetailsDTO,
} from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { Button, Grid, GridCol, Text } from "@mantine/core";
import {
  IconArrowRight,
  IconHeart,
  IconHeartFilled,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addOrUpdateCartAction,
  addToWishListed,
  getIsWishListed,
  getPdpCartData,
  removeFromWishListed,
} from "./actions";
import { useCartActions, useCartItemById } from "@/utils/store/cart";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";


const ButtonSection = ({
  pdpData,
  productItemId,
}: {
  pdpData: ProductDetailsDTO;
  productItemId: string;
}) => {
  const cartDetailsForProduct = useCartItemById(productItemId);
  const router = useRouter();
  const { isLoggedIn } = useCurrentUser();
  const [cartButtonLoader, setCartButtonLoader] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [wishlistButtonLoader, setWishlistButtonLoader] =
    useState<boolean>(true);
  const [noOfItemsInCart, setNoOfItemsInCart] = useState<number>(0);
  const [noOfItemsInCartLocal, setNoOfItemsInCartLocal] = useState<number>(1);
  const { addToCart, updateCart } = useCartActions();
  const outOfStock = pdpData.availableStock === 0;

  useEffect(() => {
    setNoOfItemsInCart(cartDetailsForProduct?.quantity || 0)
    setNoOfItemsInCartLocal(cartDetailsForProduct?.quantity || 1)
  }, [cartDetailsForProduct?.quantity])

  const getInitialWishlistData = async () => {
    try {
      setWishlistButtonLoader(true);
      const isWishlistedTemp = await getIsWishListed(productItemId);
      setIsWishlisted(isWishlistedTemp);
    } catch {
    } finally {
      setWishlistButtonLoader(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getInitialWishlistData();
    } else {
      setCartButtonLoader(false);
      setWishlistButtonLoader(false);
    }
  }, [isLoggedIn]);

  const addOrUpdateCart = async (type: "add" | "update") => {
    try {
      const payload: CartItemDbDTO = {
        productItemId,
        quantity: noOfItemsInCartLocal,
        priceSnapshot: pdpData.discountedPrice,
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
        await addOrUpdateCartAction(payload, type);
      }
      if (type === "update") updateCart(payload);
      else addToCart(payload);
      notify({
        variant: "success",
        title: "Success!",
        message:
          type === "add"
            ? "Item added to cart successfully!"
            : "Cart updated successfully!",
      });
    } catch (err) {
      notify({
        variant: "error",
        title: "Error!",
        message:
          type === "add"
            ? "Failed to add item in cart!"
            : "Failed to update your cart!",
      });
    } finally {
      setCartButtonLoader(false);
    }
  };

  const handleAddToCart = () => {
    if (noOfItemsInCart === 0) {
      addOrUpdateCart("add");
    } else if (noOfItemsInCart !== noOfItemsInCartLocal) {
      addOrUpdateCart("update");
    } else router.push("/checkout/cart");
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
      await addToWishListed(productItemId);
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
      await removeFromWishListed(productItemId);
      getInitialWishlistData();
    } catch (err) {
      console.error(err);
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to remove item from wishlist!",
      });
    } finally {
      setWishlistButtonLoader(false);
    }
  };

  const ctaButtonlabel = () => {
    if (outOfStock)
      return "Out of stock"
    else if (noOfItemsInCart === 0)
      return "Add to Cart"
    else if (noOfItemsInCart !== noOfItemsInCartLocal) {
      return "Update Cart"
    } else return "Go to Cart"
  }


  return (
    <Grid my={12}>
      <GridCol
        span={{ base: outOfStock ? 9 : 12, md: outOfStock ? 10 : 12, lg: 7 }}
      >
        <Button
          disabled={outOfStock}
          aria-label="addToCart"
          fullWidth
          color="black"
          size="lg"
          loading={cartButtonLoader}
          loaderProps={{ type: "dots" }}
          onClick={handleAddToCart}
          rightSection={
            noOfItemsInCartLocal &&
            noOfItemsInCart === noOfItemsInCartLocal &&
            !outOfStock && <IconArrowRight />
          }
        >
          {ctaButtonlabel()}
        </Button>
      </GridCol>
      {!outOfStock && (
        <GridCol span={{ base: 9, md: 10, lg: 3.5 }}>
          <Button.Group>
            <Button
              aria-label="minus"
              px={16}
              size="lg"
              variant="outline"
              color="black"
              onClick={() => {
                if (noOfItemsInCartLocal > 1)
                  setNoOfItemsInCartLocal((prev) => --prev);
              }}
            >
              <IconMinus size="20px" />
            </Button>
            <Button.GroupSection
              color="black"
              size="lg"
              variant="outline"
              w="100%"
            >
              <Text>{noOfItemsInCartLocal}</Text>
            </Button.GroupSection>
            <Button
              aria-label="plus"
              px={16}
              size="lg"
              variant="outline"
              color="black"
              onClick={() => {
                if (noOfItemsInCartLocal < pdpData.availableStock)
                  setNoOfItemsInCartLocal((prev) => ++prev);
              }}
            >
              <IconPlus size="20px" />
            </Button>
          </Button.Group>
        </GridCol>
      )}
      <GridCol span={{ base: 3, md: 2, lg: 1.5 }}>
        <Button
          aria-label="wishlist"
          color="black"
          size="lg"
          variant="outline"
          fullWidth
          px={16}
          onClick={
            !isWishlisted ? addToWishlistHandler : removeFromWishlistHandler
          }
          loading={wishlistButtonLoader}
          loaderProps={{ type: "dots" }}
        >
          {isWishlisted ? <IconHeartFilled /> : <IconHeart />}
        </Button>
      </GridCol>
    </Grid>
  );
};

export default ButtonSection;
