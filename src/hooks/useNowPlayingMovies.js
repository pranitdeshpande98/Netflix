import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addNowPlayingMovies} from "../utils/movieSlice";
import { useEffect } from 'react'

export const useNowPlayingMovies = () => {
    const dispatch = useDispatch(); 
    const nowPlayingmovies = useSelector((store) => store.movies.nowPlayingMovies);

        const getNowPlayingMovies = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
        };

        useEffect(()=>{
        if(!nowPlayingmovies) getNowPlayingMovies();
        }, []);

};
