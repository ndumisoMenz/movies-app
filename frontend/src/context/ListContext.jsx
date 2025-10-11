import { createContext, useState, useEffect } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [myList, setMyList] = useState(()=>{
    const storedList=localStorage.getItem("myList")
    return storedList? JSON.parse(storedList):[];
  });


  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(storedList);
  }, []);


  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const addToList = (item) => {
  setMyList((prev) => {
    if (prev.find((m) => m.id === item.id)) return prev; // prevent duplicates
    return [...prev, item];
  });
};

const removeFromList = (id) => {
  setMyList((prev) => prev.filter((m) => m.id !== id));
};


  return (
    <ListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
};
