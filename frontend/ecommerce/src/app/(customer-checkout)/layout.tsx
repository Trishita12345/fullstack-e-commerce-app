import CustomerCheckoutHeader from "@/(components)/CustomerCheckoutHeader";
import { Footer } from "@/(components)/footer";

export default function CustomerCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
