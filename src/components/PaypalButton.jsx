// src/PayPalButton.js
import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          onSuccess(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [amount, onSuccess]);

  return (
    <>
      {/* <div ref={paypalRef}></div> */}
    </>
    )
  ;
};

export default PayPalButton;

