import { createContext, useState, useEffect } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);

  // Load saved list from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(storedList);
  }, []);

  // Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const addToList = (movie) => {
    setMyList((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev; // prevent duplicates
      return [...prev, movie];
    });
  };

  const removeFromList = (id) => {
    setMyList((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <ListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
};
