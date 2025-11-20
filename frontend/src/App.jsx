import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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

// ⬇️ Zustand store
import useStore from "./store/useStore";

function App() {
  const location = useLocation();

  const movies = useMovies();
  const series = useSeries();
  const animes = useAnimes();

  const hideNavigation =
    location.pathname === "/login" || location.pathname === "/register";

  const user = useStore((s) => s.user);
  const loadingAuth = useStore((s) => s.loadingAuth);
  const loadUser = useStore((s) => s.loadUser);

  const isAuthenticated = !!user;

  // Load user on app start
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Show loading while auth state is being determined
  if (loadingAuth) return <div className="text-center mt-20">Loading...</div>;

  return (
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
            element={
              <MovieDetails allMovies={movies.all} allSeries={series.all} />
            }
          />

          <Route
            path="/series/:id"
            element={
              <SeriesDetails allMovies={movies.all} allSeries={series.all} />
            }
          />

          <Route path="/movies" element={<Movies allMovies={movies.all} />} />
          <Route path="/series" element={<Series allSeries={series.all} />} />
          <Route path="/animes" element={<Animes allAnimes={animes.all} />} />

          <Route
            path="/mylist"
            element={
              isAuthenticated ? <Mylist /> : <Navigate to="/login" replace />
            }
          />

          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </div>
    </ListProvider>
  );
}

export default App;
