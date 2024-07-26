import React, { useEffect, useRef } from 'react';

const PayPal = ({ amount, onSuccess }) => {
  const paypalRef = useRef();
  console.log(amount);
  useEffect(() => {
    if (!paypalRef.current.hasChildNodes()) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency:"CDA",
                    value: '10',
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
    }
  }, [amount, onSuccess]);

  return <div className='w-[20rem]  mt-5' ref={paypalRef}></div>;
};

export default PayPal;
