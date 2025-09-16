// src/hooks/useAnimes.js
import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb";

export function useAnimes() {  // ✅ Named export
  const [animes, setAnimes] = useState({ all: [] });

  useEffect(() => {
    (async () => {
      try {
        let all = [];
        const totalPages = 5;
        for (let page = 1; page <= totalPages; page++) {
          const res = await tmdb.series.animes(page);
          all = [...all, ...res];
        }
        setAnimes({ all });
      } catch (err) {
        console.error("Error fetching animes:", err);
      }
    })();
  }, []);

  return animes;
}
