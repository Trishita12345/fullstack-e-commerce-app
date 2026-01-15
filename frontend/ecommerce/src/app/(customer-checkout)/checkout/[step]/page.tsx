import CustomerCheckoutHeader, {
  StepType,
} from "@/(components)/CustomerCheckoutHeader";
import Cart from "./(cart)";

const Checkout = async ({ params }: PageProps<"/checkout/[step]">) => {
  const { step } = await params;
  return (
    <>
      <CustomerCheckoutHeader step={step as StepType} />
      {step === "cart" && <Cart />}
    </>
  );
};

export default Checkout;
