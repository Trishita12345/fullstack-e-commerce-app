interface PageProps {
  searchParams: {
    orderId: string;
    transactionId: string;
  };
}

async function PaymentSuccess({ searchParams }: PageProps) {
  const { orderId, transactionId } = await searchParams;
  return <>Payment Successful</>;
}

export default PaymentSuccess;
