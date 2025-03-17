"use client";
import React from "react";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase"

const GoogleLogin = () => {

  const loginWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
      
        fetch('http://localhost:4000/googleLogin', {   // connects to backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, user })
        })
        .then(response => response.json())
        .then(data => {
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl; // redirects user to the dashboard of teachers if login was success
          }
          console.log('Backend response:', data);
        })
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
        console.log(error)
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
