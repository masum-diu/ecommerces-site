// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGuxpcxfOQRPoQQY4n0Z3P9b6N8CcWvyM",
  authDomain: "aranyaauth.firebaseapp.com",
  projectId: "aranyaauth",
  storageBucket: "aranyaauth.appspot.com",
  messagingSenderId: "145327754488",
  appId: "1:145327754488:web:fe4fec7291fb24c45eff0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
