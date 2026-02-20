"use client";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center, Image, Stack, Text } from "@mantine/core";
import { use, useEffect, useRef, useState } from "react";
import { getMerchantKey, getOrderStatus } from "./checkoutSessionActions";
import { unauthorized, useRouter, useSearchParams } from "next/navigation";
import { OrderStatusPollingResponse } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import loadRazorpay from "@/utils/loadRazorpay";
import { en } from "@/constants/en";
import { useSession } from "@/utils/store/session";

const enum OrderStatuses {
  CREATED = "CREATED",
  RESERVED = "RESERVED",
  FAILED = "FAILED",
  CONFIRMED = "CONFIRMED",
}
const enum PaymentStatuses {
  NOT_INITIATED = "NOT_INITIATED",
  PENDING = "PENDING",
  INITIATED = "INITIATED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  ABANDONED = "ABANDONED",
}

const CreateCheckoutSession = () => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const orderId = useSearchParams().get("orderId");
  const razorpayOpened = useRef(false);
  const [loaderMsg, setLoaderMsg] = useState<string>(
    "Checking product availability...  ",
  );
  const session = useSession();

  const redirectToRazorPay = async (orderData: OrderStatusPollingResponse) => {
    if (razorpayOpened.current) return;
    razorpayOpened.current = true;
    const key = await getMerchantKey(orderData.orderId);
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 2️⃣ options
    const options: any = {
      key,
      amount: orderData.amount * 100, // paise
      currency: "INR",
      name: en.logoText,
      description: "Order Payment",
      order_id: orderData.gatewayOrderId,
      callback_url: "http://localhost:8080/api/payment/razorpay/callback",
      redirect: true,

      prefill: {
        name: session?.user.name,
        email: session?.user.email,
      },
      modal: {
        ondismiss: async () => {
          console.log("User closed Razorpay checkout");

          // stop polling
          if (intervalRef.current) clearInterval(intervalRef.current);

          try {
            // inform backend user abandoned payment
            await fetch("http://localhost:8080/api/payment/abandon", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderData.orderId,
              }),
            });
          } catch (e) {
            console.error("abandon api failed", e);
          }

          // send user back to cart
          router.replace("/checkout/cart");
        },
      },
      theme: {
        color: "#3399cc",
      },
    };
    // 3️⃣ open razorpay
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const checkPayment = async (orderId: string) => {
    try {
      const res: OrderStatusPollingResponse = await getOrderStatus(orderId);
      if (res.orderStatus === OrderStatuses.RESERVED) {
        if (res.paymentStatus === PaymentStatuses.PENDING) {
          setLoaderMsg("Preparing secure payment...  ");
        } else if (res.paymentStatus === PaymentStatuses.INITIATED) {
          setLoaderMsg("Opening secure payment gateway...  ");
          clearInterval(intervalRef.current!);
          await redirectToRazorPay(res);
        }
      } else if (
        res.orderStatus === OrderStatuses.FAILED &&
        res.paymentStatus === PaymentStatuses.NOT_INITIATED
      ) {
        notify({
          variant: "error",
          title: "Out of Stock",
          message: "Item just went out of stock. Please try again later.",
        });
        clearInterval(intervalRef.current!);
        router.replace("/checkout/cart");
      } else if (
        res.orderStatus === OrderStatuses.CONFIRMED &&
        res.paymentStatus === PaymentStatuses.SUCCESS
      ) {
        setLoaderMsg("Payment successful. Redirecting to success page...");
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          router.replace("/payment-success");
        }, 2000);
      } else if (
        res.orderStatus === OrderStatuses.FAILED &&
        res.paymentStatus === PaymentStatuses.FAILED
      ) {
        setLoaderMsg("Payment failed. Redirecting to failure page...");
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          router.replace("/payment-failed");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (session === null) unauthorized();
    if (!orderId) return;

    intervalRef.current = setInterval(() => {
      checkPayment(orderId);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId, session]);

  return (
    <>
      <Center maw={"100vw"} h={"100vh"}>
        <Stack align={"center"}>
          <Stack justify={"center"} align={"center"} gap={24}>
            <FontAwesomeIcon
              icon={faHourglass}
              flip
              style={{ fontSize: "40px" }}
              color="var(--mantine-color-primaryDark-9)"
            />
            <Stack align={"center"} gap={4}>
              <Text size="sm">{loaderMsg}</Text>
              <Text size="sm" c="dimmed">
                Please wait...
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Text size="sm" pos={"absolute"} bottom={40} c="dimmed" fw={500}>
          Do not refresh the page or press back button.
        </Text>
      </Center>
    </>
  );
};

export default CreateCheckoutSession;
