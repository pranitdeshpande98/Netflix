import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/LanguageConstants';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GEMINI_KEY } from '../utils/constants';
import { json } from 'react-router-dom';
import {addGPTMovieResult} from "../utils/GptSlice";


 // For each movie I willsearch TMDB API

 const searchMovieTMDB = async(movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    return json.results;

 }
const GptSearchBar = () => {

      const dispatch = useDispatch();

      const language = useSelector((store) => store.config.lang);
      const searchText = useRef(null);
      const genAI = new GoogleGenerativeAI(GEMINI_KEY);
      const handleGptSearchClick = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Act as a movie recommendation system and suggest some movies for the query : " + searchText.current.value + 
        "only give me 5 movies, comma sepearated like the example result given ahead. Example Sholay, Gadar, Terminator, Men In ";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const movie_list = response.text();
        const movies = movie_list.split(",")
        
        const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
        
        const tmdbresults = await Promise.all(promiseArray);
        dispatch(addGPTMovieResult({movieName: movies, movieResults: tmdbresults}));
      };

  return (
    <div className='pt-[8%] flex justify-center'>
        <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[language].gptSearchPlaceholder} />
                <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleGptSearchClick}> {lang[language].search}  </button>
        </form>
    </div>
  )
}

export default GptSearchBar