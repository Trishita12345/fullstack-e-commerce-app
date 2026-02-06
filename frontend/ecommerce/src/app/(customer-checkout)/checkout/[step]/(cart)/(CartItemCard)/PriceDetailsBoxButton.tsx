import { StepType } from "@/(components)/CustomerCheckoutHeader";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

const PriceDetailsBoxButton = ({ step }: { step: StepType }) => {
  const router = useRouter();

  const handleClick = () => {
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
