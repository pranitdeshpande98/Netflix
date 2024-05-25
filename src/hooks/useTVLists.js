import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addTVlist} from "../utils/movieSlice";
import { useEffect } from 'react'

export const useTVLists = () => {
        const dispatch = useDispatch(); 
        const nowtvplaying = useSelector((store) => store.movies.tvlist);
        const getTVLists = async() => {
        const data = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', API_OPTIONS);

        const json = await data.json();
        dispatch(addTVlist(json.results));
        };

        useEffect(()=>{
            if(!nowtvplaying) getTVLists();
        }, []);

};
