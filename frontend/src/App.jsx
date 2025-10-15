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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const movies = useMovies();
  const series = useSeries();
  const animes = useAnimes();

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
    <AuthProvider>
      <ListProvider>
        {!hideNavigation && <Navigation theme={theme} setTheme={setTheme} />}
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
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
                </ProtectedRoute>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <MovieDetails theme={theme} allMovies={movies.all} allSeries={series.all} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/series/:id"
              element={
                <ProtectedRoute>
                  <SeriesDetails theme={theme} allMovies={movies.all} allSeries={series.all} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movies"
              element={<ProtectedRoute><Movies allMovies={movies.all} theme={theme} /></ProtectedRoute>}
            />

            <Route
              path="/series"
              element={<ProtectedRoute><Series allSeries={series.all} theme={theme} /></ProtectedRoute>}
            />

            <Route
              path="/animes"
              element={<ProtectedRoute><Animes allAnimes={animes.all} theme={theme} /></ProtectedRoute>}
            />

            <Route
              path="/mylist"
              element={<ProtectedRoute><Mylist theme={theme} /></ProtectedRoute>}
            />

            <Route
              path="/disclaimer"
              element={<ProtectedRoute><Disclaimer theme={theme} /></ProtectedRoute>}
            />
          </Routes>
        </div>
      </ListProvider>
    </AuthProvider>
  );
}

export default App;


