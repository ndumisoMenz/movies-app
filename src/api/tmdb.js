
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTMDB(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("TMDB API error:", err);
    return [];
  }
}

export const tmdb = {
  movies: {
    popular: () => fetchFromTMDB("/movie/popular?"),
    trending: () => fetchFromTMDB("/trending/movie/week?"),
    topRated: () => fetchFromTMDB("/movie/top_rated?"),
    discover: (page = 1) => fetchFromTMDB(`/discover/movie?page=${page}`),
    search: (query) => fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`),
  },
  series: {
    popular: () => fetchFromTMDB("/tv/popular?"),
    trending: () => fetchFromTMDB("/trending/tv/week?"),
    topRated: () => fetchFromTMDB("/tv/top_rated?"),
    discover: (page = 1) => fetchFromTMDB(`/discover/tv?page=${page}`),
    animes: (page = 1) => fetchFromTMDB(`/discover/tv?with_keywords=210024&page=${page}`),
  },
};

