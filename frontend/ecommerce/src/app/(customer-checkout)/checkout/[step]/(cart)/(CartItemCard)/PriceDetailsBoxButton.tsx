"use client";
import { StepType } from "@/(components)/CustomerCheckoutHeader";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import { notify } from "@/utils/helperFunctions";
import { useAllAddresses } from "@/utils/store/address";
import { useCartItems } from "@/utils/store/cart";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

const PriceDetailsBoxButton = ({ step }: { step: StepType }) => {
  const router = useRouter();
  const selectedCartItems = useCartItems().filter((c) => c.isSelected);
  const addresses = useAllAddresses();

  const handleClick = () => {
    if (addresses?.length === 0) {
      notify({
        variant: 'error',
        title: 'No address added!',
        message: 'Please add address before proceed.',
      })
      return;
    }
    const path = step == "cart" ? "./address" : "./payment";
    router.push(path);
  };
  return (
    <>
      {step !== "payment" ? (
        <LoginComponent
          LoggedInComponent={() => (
            <Button
              color="primaryDark.7"
              size="md"
              fullWidth
              onClick={handleClick}
              disabled={selectedCartItems.length === 0}
            >
              <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
                Continue
              </Text>
            </Button>
          )}
          NotLoggedInComponent={({ openLoginPopUp }: LoggedOutProps) => (
            <Button
              color="primaryDark.7"
              size="md"
              fullWidth
              onClick={openLoginPopUp}
            >
              <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
                Login to Proceed
              </Text>
            </Button>
          )}
        />
      ) : null}
    </>
  );
};

export default PriceDetailsBoxButton;
