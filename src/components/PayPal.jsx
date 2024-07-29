import React, { useEffect, useRef, useState } from 'react';
import { PayPalButtons , usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useFirebase } from '../firebaseContext/Firebase';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
const PayPal = ({ amount, course }) => {

  const firebase = useFirebase()
  const [paypal,setPayPal] = useState('')

  const [{isPending},paypalDispatch] = usePayPalScriptReducer()

  useEffect(()=>{
    const getClientId=async()=>{
      const response = await axios.get('http://localhost:5000/api/config/paypal');
      const {data} = response
      setPayPal(data)
=======
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
>>>>>>> 44239b06a0fe42acae4c10b69931c25296d6c5cd
    }
    getClientId()
  },[axios])

  useEffect(()=>{
    if (paypal.clientId) {
        const loadingPayPalScript = async()=>{
            paypalDispatch({
            type: 'resetoptions',
            value :{
                'client-id':paypal.clientId,
                currency:'USD',
            }
         })
         paypalDispatch({type:'setLoadingStatus',value:'pending'})
      }
        if (order && !order.isPaid) {
            if(!window.paypal){
                loadingPayPalScript()
            }
        }
    }
    },[paypal,paypalDispatch])

      function createOrder(data ,actions){
        return actions.order
        .create({
            purchase_units:[{amount:{value:amount}}]
        }).then((orderID)=>{
            console.log(orderID);
            return orderID
        })
    }
    const navigate = useNavigate()
    function onApprove(data ,actions){
      return actions.order
      .capture().then(async function(details){
        try {
          console.log('Order successful: ', details);
          const uid = firebase.user.uid
          await firebase.setDocFirestore(uid,course)
          navigate('/learning')
        } catch (error) {
          console.log(error);
        }
      })
    }
    function onError(err){
      console.log(err);
     }
  return (
  <>
     {isPending ?<Loader/>:<div>
                          <div>
                            <PayPalButtons 
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            ></PayPalButtons>
                          </div>
        </div>}
  </>
)
};

export default PayPal;
