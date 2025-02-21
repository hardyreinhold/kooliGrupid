// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2eeiybGA3PzIHWvZ8frZN1CVX6SFyGqg",
  authDomain: "kooligrupid-bf326.firebaseapp.com",
  projectId: "kooligrupid-bf326",
  storageBucket: "kooligrupid-bf326.firebasestorage.app",
  messagingSenderId: "248528463464",
  appId: "1:248528463464:web:cbf2ccb8d1dd67d4fcfddd",
  measurementId: "G-JPV4ECCSCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);