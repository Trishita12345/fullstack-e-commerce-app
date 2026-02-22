import { OrderDetailsDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

interface PageProps {
  searchParams: {
    orderId: string;
  };
}

async function PaymentSuccess({ searchParams }: PageProps) {
  const { orderId } = await searchParams;
  const orderDetails = await apiFetch<OrderDetailsDTO>(
    `/order-service/order-details/${orderId}`,
  );
  console.log("orderDetails: ", orderDetails);
  return <>Payment Successful</>;
}

export default PaymentSuccess;
