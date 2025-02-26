"use client"
import React from 'react'
import Image from "next/image"
import {auth, db} from "../firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {doc, getDoc, setDoc} from 'firebase/firestore'

const GoogleLogin = () => {
    
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            const user = auth.currentUser;
            if(user) {
                const userDocRef = doc(db, "users", user.uid)
                const userDocSnapshot = await getDoc(userDocRef);
                if(!userDocSnapshot.exists()) {
                    await setDoc(userDocRef, {
                        userId: user.uid,
                        email: user.email,
                    })
                }
            }
        } catch (err){
            console.log(err)
        }
    }

  return (
    <div className="flex justify-center mt-4">
        <button onClick={loginWithGoogle}className="w-full py-2 p-4 font-semibold text-gray-700 bg-white border rounded-md shadow-md hover:bg-gray-100 flex items-center justify-center">
        <Image 
        src="https://www.svgrepo.com/show/355037/google.svg" 
        alt="Google logo"
        width={20}
        height={20}
        className = "m-2" />Login with Google
        </button>
    </div>
  )
}

export default GoogleLogin