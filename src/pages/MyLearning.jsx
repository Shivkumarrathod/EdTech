import React, { useEffect, useState } from 'react'
import { useFirebase } from '../firebaseContext/Firebase'
import SingleCourse from '../components/SigngleCourse'
import { useNavigate } from 'react-router-dom'

const MyLearning = () => {
    const firebase = useFirebase()
    const [course,setCourse] = useState([])

    useEffect(()=>{
        const getData=async()=>{
          const url =firebase.user.uid
          const courseData =await firebase.getAllCourse(url)
          setCourse(courseData)
        }
        getData()
      },[firebase,course])
   const navigate = useNavigate()
   useEffect(()=>{
    if (!firebase.isLoggedIn) {
      navigate('/login')
    }
  },[firebase])
  return (
    <>
    <h1 className='ml-20 text-2xl text-orange-600 font-bold underline hover:text-blue-600'>Enrolled courses</h1>
    <div className="flex flex-wrap justify-center">
      {course.map(course => (
        <SingleCourse key={course.id} course={course} />
      ))}
    </div>
    </>
    
  )
}

export default MyLearning