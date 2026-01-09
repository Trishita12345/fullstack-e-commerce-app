"use client";
import { pdpCartDataDTO, ProductDetailsDTO } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { Button, Grid, GridCol, Group, Text } from "@mantine/core";
import {
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
  IconHeart,
  IconHeartFilled,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ButtonSection = ({
  pdpData,
  pdpCartData,
}: {
  pdpData: ProductDetailsDTO;
  pdpCartData: pdpCartDataDTO;
}) => {
  const [cartButtonLoader, setCartButtonLoader] = useState<boolean>(false);
  const [wishlistButtonLoader, setWishlistButtonLoader] =
    useState<boolean>(false);
  const [noOfItemsInCartLocal, setNoOfItemsInCartLocal] = useState<number>(
    pdpCartData.noOfItemsInCart
  );

  const { noOfItemsInCart, addedToWishList } = pdpCartData;
  const addToCart = async () => {
    try {
      setCartButtonLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // api call here
      notify({
        variant: "success",
        title: "Success!",
        message: "Item added to cart successfully!",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setCartButtonLoader(false);
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to add item in cart!",
      });
    }
  };

  const addToWishlist = async () => {
    try {
      setWishlistButtonLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // api call here
      notify({
        variant: "success",
        title: "Success!",
        message: "Item added to wishlist successfully!",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setWishlistButtonLoader(false);
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to add item in wishlist!",
      });
    }
  };

  const removeFromWishlist = async () => {
    try {
      setWishlistButtonLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // api call here
      notify({
        variant: "success",
        title: "Success!",
        message: "Item removed from wishlist successfully!",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setWishlistButtonLoader(false);
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to remove item from wishlist!",
      });
    }
  };

  const goToCart = () => {};

  return (
    <Grid my={12}>
      <GridCol span={{ base: 12, md: 12, lg: 7 }}>
        <Button
          fullWidth
          color="black"
          size="lg"
          loading={cartButtonLoader}
          loaderProps={{ type: "dots" }}
          onClick={() =>
            noOfItemsInCartLocal && noOfItemsInCart === noOfItemsInCartLocal
              ? goToCart()
              : addToCart()
          }
          rightSection={
            noOfItemsInCartLocal && noOfItemsInCart === noOfItemsInCartLocal ? (
              <IconArrowRight />
            ) : null
          }
        >
          {noOfItemsInCart === 0
            ? "Add to Cart"
            : noOfItemsInCart !== noOfItemsInCartLocal
            ? "Update Cart"
            : "Go to Cart"}
        </Button>
      </GridCol>
      <GridCol span={{ base: 9, md: 10, lg: 3.5 }}>
        <Button.Group>
          <Button
            px={16}
            size="lg"
            variant="outline"
            color="black"
            onClick={() => {
              if (noOfItemsInCartLocal > 0)
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
            <Text>{noOfItemsInCartLocal ?? 0}</Text>
          </Button.GroupSection>
          <Button
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
      <GridCol span={{ base: 3, md: 2, lg: 1.5 }}>
        <Button
          color="black"
          size="lg"
          variant="outline"
          fullWidth
          px={16}
          onClick={!addedToWishList ? addToWishlist : removeFromWishlist}
          loading={wishlistButtonLoader}
          loaderProps={{ type: "dots" }}
        >
          {addedToWishList ? <IconHeartFilled /> : <IconHeart />}
        </Button>
      </GridCol>
    </Grid>
  );
};

export default ButtonSection;
