// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtDnktynwgvzgpP2Q1mMpc54G6bs-i0vg",
  authDomain: "next-auth-aranya.firebaseapp.com",
  projectId: "next-auth-aranya",
  storageBucket: "next-auth-aranya.appspot.com",
  messagingSenderId: "162472437137",
  appId: "1:162472437137:web:7564cbe2d494aa19c66630",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
