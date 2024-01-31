"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse mb-12">
        <div className="h-11 bg-gray-300 rounded my-3" />
        <div className="h-11 bg-gray-300 rounded my-3" />
        <div className="h-11 bg-gray-300 rounded my-3" />
      </div>
    );
  }

  return <PayPalButtons />;
};
