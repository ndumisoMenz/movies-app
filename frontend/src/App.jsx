import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./components/Pages/Home";
import Mylist from "./components/GeneralComponents/Mylist";
import Search from "./components/Search/Search";
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

function App() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const movies = useMovies();
  const series = useSeries();
  const animes = useAnimes();

  // Hide Navigation on login/register pages
  const hideNavigation = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "initial";
      document.body.style.color = "black";
    }
  }, [theme]);

  return (
    <ListProvider>
      {!hideNavigation && <Navigation theme={theme} setTheme={setTheme} />}
      <div>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <Home
                allMovies={movies.all}
                movies={movies.popular}
                trending={movies.trending}
                topRated={movies.topRated}
                seriesPopular={series.popular}
                seriesTrending={series.trending}
                seriesTopRated={series.topRated}
                theme={theme}
              />
            }
          />

          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                theme={theme}
                allMovies={movies.all}
                allSeries={series.all}
              />
            }
          />

          <Route
            path="/series/:id"
            element={
              <SeriesDetails
                theme={theme}
                allMovies={movies.all}
                allSeries={series.all}
              />
            }
          />

          <Route
            path="/movies"
            element={<Movies allMovies={movies.all} theme={theme} />}
          />

          <Route
            path="/series"
            element={<Series allSeries={series.all} theme={theme} />}
          />

          <Route
            path="/animes"
            element={<Animes allAnimes={animes.all} theme={theme} />}
          />

          <Route path="/mylist" element={<Mylist theme={theme} />} />
          <Route path="/disclaimer" element={<Disclaimer theme={theme} />} />
        </Routes>
      </div>
    </ListProvider>
  );
}

export default App;



