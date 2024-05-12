// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD21KHNPHJfAw8ESx4lEDHLrrXAUqU3NBo",
  authDomain: "netflixgpt-86887.firebaseapp.com",
  projectId: "netflixgpt-86887",
  storageBucket: "netflixgpt-86887.appspot.com",
  messagingSenderId: "166790156879",
  appId: "1:166790156879:web:3e25fd19afdcb902dc103a",
  measurementId: "G-EVCHSFCY6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();