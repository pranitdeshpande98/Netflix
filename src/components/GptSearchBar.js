import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/LanguageConstants';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GEMINI_KEY } from '../utils/constants';
import { addGPTMovieResult } from "../utils/GptSlice";

// For each movie I will search TMDB API
const searchMovieTMDB = async (movie) => {
  const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
  const json = await data.json();
  return json.results;
};

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const [loading, setLoading] = useState(false);

  const handleGptSearchClick = async () => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Act as a movie recommendation system and suggest some movies for the query: " + searchText.current.value + 
    ". Only give me 5 movies, comma separated like the example result given ahead. Example: Sholay, Gadar, Terminator, Men In Black.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const movie_list = await response.text();
    const movies = movie_list.split(",");
    
    const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
    
    const tmdbresults = await Promise.all(promiseArray);
    dispatch(addGPTMovieResult({ movieName: movies, movieResults: tmdbresults }));
    setLoading(false);
  };

  return (
    <div className='pt-[8%] flex justify-center'>
      <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[language].gptSearchPlaceholder} />
        <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleGptSearchClick} disabled={loading}>
          {lang[language].search}
        </button>
      </form>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <svg className="animate-spin h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
