// src/components/NavBar.js

import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth, useFirebase } from '../firebaseContext/Firebase';
import { signOut } from 'firebase/auth';

const NavBar = () => {
  const firebase = useFirebase()

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut =async()=>{
    await signOut(firebaseAuth)
    navigate('/login')
  }

  // useEffect(()=>{
  //   if (!firebase.isLoggedIn) {
  //     navigate('/login')
  //   }
  // },[firebase])
  
  return (
    <nav className="mt-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-black text-xl font-bold text-4xl border-b border-orange-600 border-b-[2px]">E<span className='text-red-600 font-cursive font-bold'>d</span>Tech</Link>
            </div>
            <div className="hidden sm:block sm:ml-10 w-[80%]">
              <div className="flex space-x-4">
                <Link to="/" className="text-black px-6 py-2 text-orange-600  rounded-full text-sm font-medium border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Home</Link>
                <Link to="/learning" className="text-black px-6 py-2 rounded-full text-sm font-medium text-orange-600 border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Learning</Link>
                <Link to="/course" className="text-black px-6 py-2 rounded-full text-sm font-medium text-orange-600 border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Course</Link>
              </div>
            </div>
            <div>
              {firebase.isLoggedIn?(
                <>
                  <button onClick={handleSignOut} className="text-black px-10 py-2 ml-10 rounded-full text-sm font-medium text-blue-600 border border-blue-600 bg-blue-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Logout</button>
                </>
              ):(
                <Link to="/login" className="text-black px-10 py-2 ml-10 rounded-full text-sm font-medium text-blue-600 border border-blue-600 bg-blue-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={toggleMenu} className="text-black px-6 py-2 text-orange-600  rounded-full text-sm font-medium border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Home</Link>
            <Link to="/learning" onClick={toggleMenu} className="text-black px-6 py-2 text-orange-600  rounded-full text-sm font-medium border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Learning</Link>
            <Link to="/course" onClick={toggleMenu} className="text-black px-6 py-2 text-orange-600  rounded-full text-sm font-medium border border-orange-600 bg-orange-600 bg-opacity-10 hover:bg-opacity-100 hover:text-black">Course</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
