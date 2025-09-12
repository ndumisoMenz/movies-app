import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home"
import Mylist from "./components/Mylist";
import Search from "./components/Search"
import React, { useState, useEffect } from "react";
import {ListProvider} from "./context/ListContext";
import MovieDetails from "./components/MovieDetails";
import SeriesDetails from "./components/SeriesDetails";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Animes from "./components/Animes";
import Navigation from "./components/Navigation";



const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


function App() {

  const[theme,setTheme]=useState('light')

  const [movies, setMovies] = useState([]);
  const[trending,setTrending]=useState([]);
  const[topRated,setTopRated]=useState([]);
  const[allMovies,setAllMovies]=useState([]);
  const [allSeries, setAllSeries] = useState([]); 
  const [allAnimes, setAllAnimes] = useState([]);

  const [seriesPopular, setSeriesPopular] = useState([]);
  const [seriesTrending, setSeriesTrending] = useState([]);
  const [seriesTopRated, setSeriesTopRated] = useState([]);

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

  async function fetchAllMovies(totalPages=15) {
    setLoading(true);
    try {
      let allResults=[]
      for(let page=1;page<=totalPages;page++){
        const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
      );
      const data = await res.json();
      if(data.results?.length){
        allResults=[...allResults,...data.results];
        }else{
        break;
      }
    }

      setAllMovies(allResults);
      } catch (err) {
      console.error("Error fetching all movies:", err);
    } finally {
      setLoading(false);
    }
    }

    async function fetchAllSeries(totalPages = 15) {
  setLoading(true);
  try {
    let allResults = [];
    for (let page = 1; page <= totalPages; page++) {
      const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
      );
      const data = await res.json();
      if (data.results?.length) {
        allResults = [...allResults, ...data.results];
      } else {
        break;
      }
    }
    setAllSeries(allResults); // assuming you have a state for allSeries
  } catch (err) {
    console.error("Error fetching all series:", err);
  } finally {
    setLoading(false);
  }
}

async function fetchAllAnimes(totalPages = 10) {
  setLoading(true);
  try {
    let allResults = [];
    for (let page = 1; page <= totalPages; page++) {
      const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=210024&page=${page}`
      ); // TMDB keyword for anime content
      const data = await res.json();
      if (data.results?.length) {
        allResults = [...allResults, ...data.results];
      } else {
        break;
      }
    }
    setAllAnimes(allResults);
  } catch (err) {
    console.error("Error fetching animes:", err);
  } finally {
    setLoading(false);
  }
}

    async function fetchPopularSeries() {
    try {
      const res = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setSeriesPopular(data.results || []);
    } catch (err) {
      console.error("Error fetching popular series:", err);
    }
  }

  async function fetchTrendingSeries() {
    try {
      const res = await fetch(
        `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setSeriesTrending(data.results || []);
    } catch (err) {
      console.error("Error fetching trending series:", err);
    }
  }

  async function fetchTopRatedSeries() {
    try {
      const res = await fetch(
        `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setSeriesTopRated(data.results || []);
    } catch (err) {
      console.error("Error fetching top rated series:", err);
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
    fetchAllMovies();
    

    fetchPopularSeries();
    fetchTrendingSeries();
    fetchTopRatedSeries();
    fetchAllSeries();
    fetchAllAnimes()
  }, []);

  return (
    <ListProvider>
      <Router>
        <Navigation theme={theme} setTheme={setTheme}/>
        <div className="">
          <Routes>
            
            <Route path="/" element={
              <Home 
              allMovies={allMovies} movies={movies} trending={trending} theme={theme} setTheme={setTheme} topRated={topRated} 
                  seriesPopular={seriesPopular}
                  seriesTrending={seriesTrending}
                  seriesTopRated={seriesTopRated}
              />
            }/>
            <Route path="/movie/:id" element={<MovieDetails allMovies={allMovies} allSeries={allSeries}/>}/>
            <Route path="/series/:id" element={<SeriesDetails />} />
            <Route path="/movies" element={<Movies allMovies={allMovies} theme={theme} />} />
            <Route path="/series" element={<Series allSeries={allSeries} theme={theme} />} />
            <Route path="/animes" element={<Animes allAnimes={allAnimes} theme={theme} />} />
            <Route path="/mylist" element={<Mylist theme={theme} />} />
          </Routes>
            
        </div>
      </Router>
    </ListProvider>
  )
}

export default App
