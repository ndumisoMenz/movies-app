import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Pages/Home"
import Mylist from "./components/GeneralComponents/Mylist";
import Search from "./components/GeneralComponents/Search"
import React, { useState, useEffect } from "react";
import {ListProvider} from "./context/ListContext";
import MovieDetails from "./components/Movie/MovieDetails";
import SeriesDetails from "./components/TV/SeriesDetails";
import Movies from "./components/Movie/Movies";
import Series from "./components/TV/Series";
import Animes from "./components/TV/Animes";
import Navigation from "./components/GeneralComponents/Navigation";


import { useMovies } from "./hooks/useMovies";
import { useSeries } from "./hooks/useSeries";
import { useAnimes } from "./hooks/useAnimes";


function App() {

  const[theme,setTheme]=useState('light')
  const movies = useMovies();
  const animes = useAnimes();
  const series = useSeries();


  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if(theme==='dark'){
      document.body.style.backgroundColor="#000000"
      document.body.style.color = "white";
    }else{
      document.body.style.backgroundColor="initial"
      document.body.style.color = "black";
    }
  },[theme])


  return (
    <ListProvider>
      <Router>
        <Navigation theme={theme} setTheme={setTheme}/>
        <div className="">
          <Routes>
            
            <Route path="/" element={
              <Home allMovies={movies.all} movies={movies.popular} trending={movies.trending} topRated={movies.topRated}
              seriesPopular={series.popular} seriesTrending={series.trending} seriesTopRated={series.topRated} theme={theme}
              />
            }/>
            

            <Route path="/movie/:id" element={<MovieDetails theme={theme} allMovies={movies.all} allSeries={series.all}/>}/>
            <Route path="/series/:id" element={<SeriesDetails theme={theme} allMovies={movies.all} allSeries={series.all}/>}/>
            <Route path="/movies" element={<Movies allMovies={movies.all} theme={theme} />} />
            <Route path="/series" element={<Series allSeries={series.all} theme={theme} />} />
            <Route path="/animes" element={<Animes allAnimes={animes.all} theme={theme} />} />
            <Route path="/mylist" element={<Mylist theme={theme} />} />

            
          </Routes>
            
        </div>
      </Router>
    </ListProvider>
  )
}

export default App



