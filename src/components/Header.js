import React, {useEffect} from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SIGNOUT } from '../utils/constants';

const Header = () => {
  const user = useSelector((store) => store.user);
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

  return (
    <div className='absolute w-screen px-10 py-3 bg-gradient-to-b from-black z-10 flex justify-between'>
        
        <img className="w-44" 
        src = {LOGO} alt="logo" />
        {user && <div>
          <img className = "w-12 h-12 mt-3" alt='usericon' src={SIGNOUT} />
          <button className='font-bold text-white left-15' onClick={handleSignOut}>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header