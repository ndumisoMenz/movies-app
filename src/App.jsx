import Home from "./components/Home"
import Search from "./components/Search"
import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


function App() {

  const [movies, setMovies] = useState([]);
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

  useEffect(() => {
    fetchMovies("popular");
  }, []);

  return (
    <>
    <Home movies={movies}/>
    </>
  )
}

export default App
