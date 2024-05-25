import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addPopularMovies} from "../utils/movieSlice";
import { useEffect } from 'react'

export const usePopularMovies = () => {
        const dispatch = useDispatch(); 

        const nowpopularmovies = useSelector((store) => store.movies.popularMovies);
        const getPopularMovies = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)

        const json = await data.json();
        dispatch(addPopularMovies(json.results));
        };

        useEffect(()=>{
            if(!nowpopularmovies) getPopularMovies();
        }, []);

};
