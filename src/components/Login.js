import React from 'react'
import Header from './Header'

const Login = () => {
  return (
    <div>
        < Header />
        <div className="w-screen h-screen flex justify-center items-center absolute">
        <img className = "w-full h-full object-cover" src= "https://assets.nflxext.com/ffe/siteui/vlv3/31ef2c5c-3d08-47d5-b7a9-f29e4f4f893d/3152e5c9-a0d5-495b-ab03-073a70c5d268/US-en-20240506-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34f5ff74-a994-4852-b27c-f4196ec21c67_small.jpg"
        alt = "logo" />
        </div>
      <form className="w-3/12 p-12 absolute bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-85">
        <h1 className="font-bold text-4xl py-4"> Sign In</h1>
        <input type="text" placeholder="Email Address" className="p-4 my-3 w-full rounded-md bg-black text-xl border from-black" />
        <input type="password" placeholder="Password" className="p-4 my-3 w-full rounded-md  bg-black text-xl border from-black" />
        <button className="p-4 my-6 bg-red-700 text-white rounded-md w-full"> Sign In </button>
      </form>
    </div>
  )
}

export default Login