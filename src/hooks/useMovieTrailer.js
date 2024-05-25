import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieid) => {
    const dispatch = useDispatch();
    const trailervideo = useSelector((store) => store.movies.trailerVideo);

    const getMovieVideos = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/'+movieid+'/videos?language=en-US', API_OPTIONS);
  
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    };
  
    useEffect(()=>{
      if(!trailervideo) getMovieVideos();
    }, []);


};


export default useMovieTrailer;