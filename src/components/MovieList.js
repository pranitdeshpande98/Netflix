import React, { useRef } from 'react';
import {MovieCard} from './MovieCard';

export const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div>
      <div className='px-6'>
        <h1 className='text-3xl py-4 text-white'>{title}</h1>
        <div className="relative group">
          <button
            onClick={() => scroll(-300)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            &lt;
          </button>
          <div className='flex overflow-x-scroll scrollbar-hide space-x-4 p-4' ref={scrollRef}>
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
          <button
            onClick={() => scroll(300)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
