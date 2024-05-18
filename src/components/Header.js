import React, {useEffect} from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SIGNOUT, SUPPORTED_LANGUAGES } from '../utils/constants';
import {toggleGptSearchView} from "../utils/GptSlice";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
  
          signOut(auth).then(() => {

          }).catch((error) => {
           navigate("/error");
    });
  }

  useEffect(()=>{
       
    const unsubscribe  = onAuthStateChanged(auth, (user) => {
    if (user) {

        const {uid, email, displayName} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName}));
        navigate("/browse");
    } else {
        dispatch(removeUser());
        navigate("/");
    }
    });

    return () => unsubscribe();
},[]);

const handleGptSearchClick = () => {
  dispatch(toggleGptSearchView());

}

const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
}

  return (
    <div className='absolute w-screen px-10 py-3 bg-gradient-to-b from-black z-10 flex justify-between'>
        
        <img className="w-44" 
        src = {LOGO} alt="logo" />
        {user && <div className='flex p-2'>
          {showGptSearch && <select className='py-2 px-2 mt-4 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang =>  
              <option key = {lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
             )}
          </select>}

          <button onClick={handleGptSearchClick} className='py-2 px-4 m-2 mt-4 text-white bg-purple-800 rounded-lg'>{showGptSearch ? "Browse" : "GPT Search"}</button>
          <img className = "w-12 h-12 mt-3" alt='usericon' src={SIGNOUT} />
          <button className='font-bold text-white left-15' onClick={handleSignOut}>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header