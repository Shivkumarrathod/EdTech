import React, { useEffect, useState } from 'react';
import {useFirebase} from '../../firebaseContext/Firebase'
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const firebase = useFirebase()
  // console.log(firebase);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn=async()=>{
    try {
      const result = await firebase.signIn(email,password)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignUp=async()=>{
    try {
      const result = await firebase.signUp(email,password)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignInWithGoogle=async()=>{
    try {
      const result = await firebase.signInWithGoogle()
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate()

  useEffect(()=>{
    if (firebase.isLoggedIn) {
      navigate('/')
    }
  },[firebase])
  return (
    <div className="flex items-center mt-20 justify-center">
      <div className="bg-gray-200 p-8 rounded shadow-md w-full max-w-md">
        {isSignUp?(<>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
          onClick={handleSignUp}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
          >
            Create one
          </button>
          <button onClick={()=>setIsSignUp(false)}> have Account? <span className='border-b border-red-600 border-b-[2px] p-2 hover-text-red-500 text-bold'>Login</span></button>
        </>):(<>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
          onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
          >
            Login
          </button>
          <button onClick={()=>setIsSignUp(true)}>Don't have Account?<span className='border-b border-red-600 border-b-[2px] p-2 hover-text-red-500 text-bold'>Create one</span> </button>
        </>)}
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className=" mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
          >
            Sign in with Google
          </button>
      </div>
      
    </div>
  );
};

export default GetStarted;
