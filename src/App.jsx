import Home from "./components/Home"
import Search from "./components/Search"
import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


function App() {

  const[theme,setTheme]=useState('light')

  const [movies, setMovies] = useState([]);
  const[trending,setTrending]=useState([]);
  const[topRated,setTopRated]=useState([]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

   async function fetchMovies(typeOrQuery) {
    setLoading(true);
    let url = "";

    if (typeOrQuery === "popular") {
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(typeOrQuery)}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }

   async function fetchTrending() {
    try {
      const res = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTrending(data.results || []);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  }

  async function fetchTopRated() {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setTopRated(data.results || []);
    } catch (err) {
      console.error("Error fetching top rated movies:", err);
    }
  }

  useEffect(()=>{
    if(theme==='dark'){
      document.body.style.backgroundColor="#000000"
      document.body.style.color = "white";
    }else{
      document.body.style.backgroundColor="initial"
      document.body.style.color = "black";
    }
  },[theme])

  useEffect(() => {
    fetchMovies("popular");
    fetchTrending();
    fetchTopRated();
  }, []);

  return (
    <div className="bg-black">
    <Home movies={movies} trending={trending} theme={theme} setTheme={setTheme} topRated={topRated} />
    </div>
  )
}

export default App
