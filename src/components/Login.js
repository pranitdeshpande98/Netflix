import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData} from "../utils/validate";
const Login = () => {

  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);
    //THen I can proceed with sing in and signup
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
        <img className = "w-full h-full object-cover" src= "https://assets.nflxext.com/ffe/siteui/vlv3/31ef2c5c-3d08-47d5-b7a9-f29e4f4f893d/3152e5c9-a0d5-495b-ab03-073a70c5d268/US-en-20240506-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34f5ff74-a994-4852-b27c-f4196ec21c67_small.jpg"
        alt = "logo" />
        </div>
      <form onSubmit={(e) => e.preventDefault() } className="w-3/12 p-12 absolute bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-85">
        <h1 className="font-bold text-4xl py-4"> {IsSignInForm ? "Sign In" : "Sign Up" }</h1>
        {!IsSignInForm && (<input type="text" placeholder="Full Name" className="p-4 my-3 w-full rounded-lg bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />) }
        <input type="text" ref = {email} placeholder="Email Address" className="p-4 my-3 w-full rounded-lg bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />
        <input type="password" ref={password} placeholder="Password" className="p-4 my-3 w-full rounded-lg  bg-black text-xl border from-black focus:outline-none focus:border-4 focus:border-blue-700" />
        <p className="text-red-600 text-x1 font-bold py-2"> {errorMessage} </p>
        <button className="p-4 my-6 bg-red-700 text-white rounded-lg w-full hover:bg-red-900 shadow-md transition duration-300 ease-in-out" onClick={handleButtonClick}>  
          {IsSignInForm ? "Sign In" : "Sign Up" } 
        </button>
        <p className = "cursor-pointer" onClick={toggleSignInForm}> {IsSignInForm ? "Are you new to Neflix? Sign Up Now" : "Already Registered ? Sign In Now." }</p>
      </form>
    </div>
  )
}

export default Login