"use client";
import React from "react";
import Image from "next/image";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleLogin = () => {
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={loginWithGoogle}
        className="w-full py-2 p-4 font-semibold text-gray-700 bg-white border rounded-md shadow-md hover:bg-gray-100 flex items-center justify-center"
      >
        <Image
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="m-2"
        />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
