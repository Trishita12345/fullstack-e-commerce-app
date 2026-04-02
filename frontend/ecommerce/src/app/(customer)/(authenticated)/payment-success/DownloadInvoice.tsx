"use client";

import { apiFetch } from "@/lib/apiFetch";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function DownloadInvoice({ orderId }: { orderId: string }) {
  // const handleDownloadInvoice = async () => {
  //   try {
  //     const response = await apiFetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/order-service/invoice/download/${orderId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${await getToken()}`,
  //         },
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to download invoice");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `invoice_${orderId}.pdf`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading invoice:", error);
  //   }
  // };
  return (
    <Button
      color="#ffffff"
      c="primaryDark.7"
      leftSection={<IconDownload />}
      onClick={() => { }}
    >
      Download Invoice
    </Button>
  );
}
