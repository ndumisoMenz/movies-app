import { createContext, useState, useEffect } from "react";
import API from "../config/apiClient";
import { useAuth } from "./AuthContext";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

 
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;           
    if (!isAuthenticated) return;   

    const fetchList = async () => {
      try {
        const movies = await API.get("/api/movies");
        setMyList(movies); 
      } catch (err) {
        console.error("Failed to load list", err.response?.data || err.message);
      }
    };

    fetchList();
  }, [isAuthenticated, loading]);

  // Add to list
  const addToList = async (item) => {
    if (!item || (!item.id && !item.movieId)) {
      console.error("Invalid item passed to addToList:", item);
      return;
    }

    const movieItem = {
      id: item.id || item.movieId,
      title: item.title || item.movieTitle || "Unknown",
      release_date: item.release_date || item.movieYear || "",
      poster: item.poster || item.poster_path || "",
      media_type: item.media_type || item.type || "movie",
    };

    try {
      const { data } = await API.post("/api/movies", {
        movieId: movieItem.id.toString(),
        movieTitle: movieItem.title,
        movieYear: movieItem.release_date?.substring(0, 4) || "Unknown",
        poster: movieItem.poster,
        type: movieItem.media_type,
      });

      if (data?.movie) {
        setMyList((prev) => [...prev, data.movie]);
      } else {
        console.error("Backend returned invalid movie data:", data);
      }
    } catch (err) {
      console.error("Error adding movie:", err.response?.data || err.message);
    }
  };

  // Remove from list
  const removeFromList = async (movieId) => {
    try {
      await API.delete(`/api/movies/${movieId}`);
      setMyList((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (err) {
      console.error("Error removing movie:", err.response?.data || err.message);
    }
  };

  return (
    <ListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
};
