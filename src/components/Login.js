import React, { useRef, useState } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { checkValidData} from "../utils/validate";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_IMAGE } from '../utils/constants';
const Login = () => {

  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);
    //THen I can proceed with sing in and signup

    if (message) return;
    // other wise sign signup user

    if(!IsSignInForm){
        //Sign Up Login
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
                updateProfile(user, {
                  displayName: name.current.value,
                }).then(() => {
                  const {uid, email, displayName} = auth.currentUser;
                  dispatch(addUser({uid:uid, email:email, displayName:displayName}));
                }).catch((error) => {
                seterrorMessage(error.message);
                });
                
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode+"-"+errorMessage);
        });

    }
    else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrorMessage(errorCode+"-"+errorMessage);
          });
            }
  }
  const resetForm = () => {
    email.current.value = '';
    password.current.value = '';
    // Add similar lines for other input fields if needed
  }
  
  const toggleSignInForm = () => {
    setIsSignInForm(!IsSignInForm);
    seterrorMessage(null);
    resetForm(); // Call the resetForm function to clear input fields
  }
  return (
    <div>
        < Header />
        <div className="w-screen h-screen flex justify-center items-center absolute">
        <img className = "w-full h-full object-cover" src= {BG_IMAGE}
        alt = "logo" />
        </div>
      <form onSubmit={(e) => e.preventDefault() } className="w-3/12 p-12 absolute bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-85">
        <h1 className="font-bold text-4xl py-4"> {IsSignInForm ? "Sign In" : "Sign Up" }</h1>
        {!IsSignInForm && (<input type="text" placeholder="Full Name" ref={name}  className="p-4 my-3 w-full rounded-lg bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />) }
        <input type="text" ref = {email} placeholder="Email Address" className="p-4 my-3 w-full rounded-lg bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />
        <input type="password" ref={password} placeholder="Password" className="p-4 my-3 w-full rounded-lg  bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />
        <p className="text-red-600 text-x1 font-bold py-2"> {errorMessage} </p>
        <button className="p-4 my-6 bg-red-700 text-white rounded-lg w-full hover:bg-red-900 shadow-md transition duration-300 ease-in-out" onClick={handleButtonClick}>  
          {IsSignInForm ? "Sign In" : "Sign Up" } 
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
  {IsSignInForm ? "Are you new to Netflix? " : "Already Registered? "}
  <span className="font-bold underline">
    {IsSignInForm ? "Sign Up Now" : "Sign In Now"}
  </span>
  .
</p>

      </form>
    </div>
  )
}

export default Login