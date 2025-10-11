// src/hooks/useSeries.js
import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb";

export function useSeries() {
  const [series, setSeries] = useState({
    popular: [],
    trending: [],
    topRated: [],
    all: [],
  });

  useEffect(() => {
    (async () => {
      try {
        // Fetch main categories in parallel
        const [popular, trending, topRated] = await Promise.all([
          tmdb.series.popular(),
          tmdb.series.trending(),
          tmdb.series.topRated(),
        ]);

        // Fetch multiple pages for "all series"
        let all = [];
        for (let page = 1; page <= 5; page++) {
          const res = await tmdb.series.discover(page);
          all = [...all, ...res];
        }

        setSeries({ popular, trending, topRated, all });
      } catch (err) {
        console.error("Error fetching series:", err);
      }
    })();
  }, []);

  return series;
}
