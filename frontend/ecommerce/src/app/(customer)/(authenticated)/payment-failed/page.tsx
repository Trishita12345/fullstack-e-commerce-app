interface PageProps {
  searchParams: {
    orderId: string;
    transactionId: string;
  };
}

async function PaymentFailure({ searchParams }: PageProps) {
  const { orderId, transactionId } = await searchParams;
  return <>Payment Failed</>;
}

export default PaymentFailure;
