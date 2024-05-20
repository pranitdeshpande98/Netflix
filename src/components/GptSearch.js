import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMAGE } from '../utils/constants'
const GptSearch = () => {
  return (
    <div>
        <div className="w-screen h-screen flex justify-center items-center fixed -z-10">
            <img className = "w-full h-full object-cover" src= {BG_IMAGE} alt = "logo" />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
        
    </div>
  )
}

export default GptSearch