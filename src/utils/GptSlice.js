import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch : false,
        movieResults: null,
        movieName: null,
    },
    reducers: {
        toggleGptSearchView: (state) =>{ 
            state.showGptSearch = !state.showGptSearch;
    },
        addGPTMovieResult: (state, action) => {
        const {movieName, movieResults} = action.payload;
        state.movieResults = movieResults;
        state.movieName = movieName;
    },
    },
});

export const {toggleGptSearchView, addGPTMovieResult} = GptSlice.actions;
export default GptSlice.reducer;
