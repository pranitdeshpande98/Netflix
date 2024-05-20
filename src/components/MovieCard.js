import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

export const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null;
  return (
    <div className='relative w-48 pr-4 min-w-[200px] transition-transform transform hover:scale-110 hover:z-10'>
      <img alt='Movie Card' src={IMG_CDN_URL + posterPath} className='rounded-lg shadow-lg' />
      
      {/* Play/Stop buttons container */}
      <div className='absolute inset-0 flex items-end justify-center pb-10 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity'>
        <button className='bg-white rounded-full p-2 mx-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
            <path d="M10.804 8l-5.468 3.25V4.75L10.804 8zm1.396 0l-6.75 4.001A1 1 0 0 1 4 11.001V4.999a1 1 0 0 1 1.45-.894l6.75 4.001a1 1 0 0 1 0 1.788z"/>
          </svg>
        </button>
        <button className='bg-white rounded-full p-2 mx-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
            <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
