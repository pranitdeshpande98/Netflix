import React from 'react'
import { MovieList } from './MovieList';
import { useSelector } from 'react-redux';


export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies.nowPlayingMovies);
  return ( movies.nowPlayingMovies && (    
    <div className=' bg-black'>
      <div className='-mt-52 relative z-20 pl-12'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
    <MovieList title={"Top Rated"} movies={movies.trendingMovies}/>
    <MovieList title={"Popular"} movies={movies.popularMovies}/>
    <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
    <MovieList title={"TV Episodes"} movies={movies.tvlist}/>
      </div>
    </div>)

  )
}
