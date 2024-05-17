import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

export const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4 min-w-[200px] transition-transform transform hover:scale-110 hover:z-10'>
        <img alt='Movie Card' src={IMG_CDN_URL + posterPath} className='rounded-lg shadow-lg'/>  
    </div>
  )
}
