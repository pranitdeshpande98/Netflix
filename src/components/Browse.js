import React from 'react'
import Header from './Header'
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies'
import { MainContainer } from './MainContainer';
import { SecondaryContainer } from './SecondaryContainer';
import { usePopularMovies } from '../hooks/usePopularMovies';
import {useUpcomingMovies} from "../hooks/useUpcomingMovies";
import {useTrendingMovies} from "../hooks/useTrendingMovies";
import {useTVLists} from "../hooks/useTVLists";
const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useTVLists();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse