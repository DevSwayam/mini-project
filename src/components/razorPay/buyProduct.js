"use client";
import React, { Suspense } from "react";
import Buy from "./buy";
import { useRouter } from "next/navigation";
import Loader from "../loader";
import { RAZORPAY_API_KEY } from "@/creds/credentials";

// console.log(RAZORPAY_API_KEY);
const BuyProduct = () => {
  //   console.log(process.env.RAZORPAY_API_KEY);
  const router = useRouter();

  const makePayment = async ({ productId = null }) => {
    // "use server"
    // const key = process.env.RAZORPAY_API_KEY;
    const key = RAZORPAY_API_KEY;
    console.log(key);
    // Make API call to the serverless API
    const data = await fetch("http://localhost:3000/api/razorpay");
    const { order } = await data.json();
    console.log(order.id);
    const options = {
      key: key,
      name: "vwakesahu",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Hackathon Testing",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log(response);

        const data = await fetch("http://localhost:3000/api/paymentverify", {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const res = await data.json();

        console.log("response verify==", res);

        if (res?.message == "success") {
          console.log("redirected.......");
          router.push(
            "/paymentsuccess?paymentid=" + response.razorpay_payment_id
          );
        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "vwakesahu",
        email: "viveksahu1762@gmail.com",
        contact: "8999545548",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default BuyProduct;
