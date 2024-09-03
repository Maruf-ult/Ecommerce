// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7j-8vyFcyxEilRNLFUDNvrlx9xzeF20Y",
  authDomain: "login-auth-b2c16.firebaseapp.com",
  projectId: "login-auth-b2c16",
  storageBucket: "login-auth-b2c16.appspot.com",
  messagingSenderId: "96296766648",
  appId: "1:96296766648:web:77b05469b14adad264b84d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;