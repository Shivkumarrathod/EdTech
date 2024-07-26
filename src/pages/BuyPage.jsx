import React, { useEffect } from 'react'
import { useState } from 'react'
import PayPal from '../components/PayPal'
import { useFirebase } from '../firebaseContext/Firebase'
import { useNavigate, useParams } from 'react-router-dom'
import SigngleCourse from '../components/SigngleCourse'
const BuyPage = () => {
  const {id} = useParams()
  const [checkout,setCheckout] = useState(false)
  const [course,setCourse] = useState('')

  const firebase = useFirebase()

  useEffect(()=>{
    const getDoc=async()=>{
      const data = await firebase.getSignleDoc(id,'courses')
      setCourse(data)
    }
    getDoc()
  },[firebase,course])

  const navigate= useNavigate()
  
  const handleSuccess = (order) => {
    console.log('Order successful: ', order);
    const uid = firebase.user.uid
    firebase.setDocFirestore(uid,course)
    setCheckout(false)
    navigate('/learning')
  };

  return (
    <div className='flex flex-wrap ml-16 mt-10 ' >
      <div className='w-[50rem]'>
        <SigngleCourse course={course}/>
      </div>
      <div className='mt-6 ml-5 w-[40rem] '>
        <div className='flex justify-between w-[20rem] border-b border-black font-bold'>
          <h1 >Price:</h1>
          <p className='ml-10'>${course.price}</p>
        </div>
        {checkout?(
          <PayPal amount={course.price} onSuccess={handleSuccess} />      ):(
          <button onClick={()=>setCheckout(true)} className='bg-orange-400 w-[20rem] mt-2 rounded-md p-1 hover:bg-blue-600'>Checkout</button>
        )}
      </div>
    </div>
  )
}

export default BuyPage