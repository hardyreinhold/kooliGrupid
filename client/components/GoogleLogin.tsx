"use client";
import React from "react";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const GoogleLogin = () => {

  const backendConnect = async () => {
    try {
      const response = await fetch("http://localhost:4000/button-click", {
        method: "POST",
      });

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={backendConnect}
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
