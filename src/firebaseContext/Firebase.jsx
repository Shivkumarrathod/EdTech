import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signInWithPopup } from "firebase/auth";
import { createContext,useContext, useEffect, useState } from "react";
import {  getDoc,doc,collection, getDocs, getFirestore, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMhDUqQjA2yXGNySdOgGUczqkkPeGahKo",
  authDomain: "milkon-41401.firebaseapp.com",
  databaseURL: "https://milkon-41401-default-rtdb.firebaseio.com",
  projectId: "milkon-41401",
  storageBucket: "milkon-41401.appspot.com",
  messagingSenderId: "162904731892",
  appId: "1:162904731892:web:df290995f037a149bbeea1",
  measurementId: "G-WKEKM0M1E9",
};

const FirebaseContext = createContext(null)
export const useFirebase =()=>useContext(FirebaseContext)

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export const FirebaseProvider =(props)=>{
    const [user,setUser ]= useState('')

    useEffect(()=>{
      onAuthStateChanged(firebaseAuth,(user)=>{
        if (user) {
           setUser(user)
        }else{
          setUser('')
        }
      })
    },[user,onAuthStateChanged]) 

    const signUp=async(email,password)=>{
      const result =await createUserWithEmailAndPassword(firebaseAuth,email,password)
      return result
    }
    const signIn=async(email,password)=>{
      const result =await signInWithEmailAndPassword(firebaseAuth,email,password)
      return result
    }
    const googleProvider =new GoogleAuthProvider()

    const isLoggedIn = user?true:false
    const signInWithGoogle =async()=>{
     const result=await signInWithPopup(firebaseAuth,googleProvider)
     return result
    }
    const getAllCourse=async(url)=>{
      const docsnpa =await getDocs(collection(db,url))
      const docsData = docsnpa.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return docsData
    }
    const getSignleDoc= async(id,url)=>{
      const docRef = doc(db, url, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return ({id:docSnap.id,...docSnap.data()})
      }else{
        return null
      }
    }
    const setDocFirestore = async(uid,data)=>{
      const docsRef =await addDoc(collection(db,uid),data)
      // return docsRef
      console.log(docsRef);
      console.log(docsRef.id);
    }

    return <FirebaseContext.Provider value={{
      signUp,
      signIn,
      isLoggedIn,
      signInWithGoogle,
      getAllCourse,
      getSignleDoc,
      setDocFirestore,
      user
    }}>
       {props.children}
    </FirebaseContext.Provider>
}