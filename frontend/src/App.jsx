import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Pages/Home";
import Mylist from "./components/GeneralComponents/Mylist";
import MovieDetails from "./components/Movie/MovieDetails";
import SeriesDetails from "./components/SeriesDetails/SeriesDetails";
import Movies from "./components/Movie/Movies";
import Series from "./components/TV/Series";
import Animes from "./components/TV/Animes";
import Navigation from "./components/GeneralComponents/Navigation";
import Disclaimer from "./components/Pages/Disclaimer";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ListProvider } from "./context/ListContext";
import { useMovies } from "./hooks/useMovies";
import { useSeries } from "./hooks/useSeries";
import { useAnimes } from "./hooks/useAnimes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  const movies = useMovies();
  const series = useSeries();
  const animes = useAnimes();

  const hideNavigation =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <AuthProvider>
      <ListProvider>
        {!hideNavigation && <Navigation />}
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  allMovies={movies.all}
                  movies={movies.popular}
                  trending={movies.trending}
                  topRated={movies.topRated}
                  seriesPopular={series.popular}
                  seriesTrending={series.trending}
                  seriesTopRated={series.topRated}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/movie/:id"
              element={<MovieDetails allMovies={movies.all} allSeries={series.all} />}
            />
            <Route
              path="/series/:id"
              element={<SeriesDetails allMovies={movies.all} allSeries={series.all} />}
            />
            <Route path="/movies" element={<Movies allMovies={movies.all} />} />
            <Route path="/series" element={<Series allSeries={series.all} />} />
            <Route path="/animes" element={<Animes allAnimes={animes.all} />} />
            <Route path="/mylist" element={<Mylist />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </div>
      </ListProvider>
    </AuthProvider>
  );
}

export default App;


