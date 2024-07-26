import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const SingleCourse = ({ course }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0 flex justify-center items-center">
          <img className="h-48 w-full object-cover md:w-48 mt-2 " src={course.image} alt={course.title} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.category}</div>
          <Link to={`/courses/${course.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {course.title}
          </Link>
          <p className="mt-2 text-gray-500">{course.description}</p>
          <div className="mt-4">
            <span className="text-yellow-500 flex">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return ratingValue <= course.rating ? (
                  <FaStar key={index} />
                ) : (
                  <FaRegStar key={index} />
                );
              })}
            </span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-2xl font-bold text-gray-900">${course.price}</span>
            <Link
              to={`/courses/${course.id}`}
              className="ml-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-10 rounded-full"
            >
              Enroll now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
