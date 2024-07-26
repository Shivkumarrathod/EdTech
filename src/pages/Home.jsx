import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='w-full mb-20 flex flex-col md:flex-row mt-8'>
        <div className="md:w-[60%] flex flex-col md:flex-row justify-around ml-5 mt-10 md:mt-[6rem]">
          <div className='w-full md:w-[82%] mt-10 ml-20'>
            <h1 className='font-cursive font-semibold text-3xl md:text-5xl'>best Education</h1>
            <h1 className='text-2xl md:text-4xl text-orange-500 mb-1 font-bold'>
              Make <span className='text-black font-semibold'>your Life</span> great
            </h1>
            <h1 className='text-3xl md:text-5xl font-sans'>
              with our <span className='text-orange-500 font-cursive'>E<span className='text-black font-cursive'>d</span>Tech!</span>
            </h1>
            <p className='font-sans mt-2 w-full md:w-[80%] ml-1 mb-3'>
            Welcome to EduSpark, where learning meets innovation.
            At EduSpark, we believe in transforming education through cutting-edge technology and engaging content. 
            Our platform offers a diverse range of courses designed to spark curiosity and drive success. 
            Whether you're looking to enhance your skills or embark on a new learning journey, EduSpark provides top-notch resources 
            and a seamless learning experience. Explore our comprehensive course offerings today and take your 
            education to the next level with EduSpark.</p>
            <Link to='/course' className='bg-orange-600 p-2 px-5 py-2  rounded-full p-1 bg-opacity-50 hover:bg-opacity-100 font-semibold '>
              See More Course
            </Link>
          </div>
        </div>
        <div className='p-1 mt-12 rounded-full drop-shadow-5xl shadow-custom-mixed flex justify-center'>
          <img src="/student.jpg" alt="home image" className='rounded-full w-[20rem] md:w-[27rem] h-[20rem] md:h-[26rem] shadow-lg'/>
        </div>
      </div>
    </>
  );
};

export default Home;
