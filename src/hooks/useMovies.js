import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb";

export function useMovies() {
  const [movies, setMovies] = useState({ popular: [], trending: [], topRated: [], all: [] });

  useEffect(() => {
    (async () => {
      const [popular, trending, topRated] = await Promise.all([
        tmdb.movies.popular(),
        tmdb.movies.trending(),
        tmdb.movies.topRated()
      ]);

      // fetch multiple pages for "all movies"
      let all = [];
      for (let page = 1; page <= 5; page++) {
        const res = await tmdb.movies.discover(page);
        all = [...all, ...res];
      }

      setMovies({ popular, trending, topRated, all });
    })();
  }, []);

  return movies;
}