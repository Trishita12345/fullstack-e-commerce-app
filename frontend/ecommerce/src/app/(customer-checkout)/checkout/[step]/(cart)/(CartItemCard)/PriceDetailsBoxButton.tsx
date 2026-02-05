import { StepType } from "@/(components)/CustomerCheckoutHeader";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import { notify } from "@/utils/helperFunctions";
import { useIfOutOfStockItemSelected } from "@/utils/store/cart";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

const PriceDetailsBoxButton = ({ step }: { step: StepType }) => {
  const router = useRouter();
  const isOutOfStockItemSelected = useIfOutOfStockItemSelected();

  const handleClick = () => {
    if (isOutOfStockItemSelected) {
      notify({
        variant: "error",
        title: "Error!",
        message: "Please unselect all out of stock items to proceed.",
      });
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
