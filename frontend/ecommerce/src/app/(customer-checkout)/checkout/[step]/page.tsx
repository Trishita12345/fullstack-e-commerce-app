import CustomerCheckoutHeader, {
  StepType,
} from "@/(components)/CustomerCheckoutHeader";
import Cart from "./(cart)";
import { Box } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

const Checkout = async ({ params }: PageProps<"/checkout/[step]">) => {
  const { step } = await params;
  return (
    <Fragment>
      <CustomerCheckoutHeader step={step as StepType} />
      <Box py={8}>{step === "cart" && <Cart />}</Box>
    </Fragment>
  );
};

export default Checkout;
