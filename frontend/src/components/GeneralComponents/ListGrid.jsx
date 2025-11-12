import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HoverDescription from "./HoverDescription";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ListGrid = ({ title, movies, type = "movie", theme }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* Left Chevron */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((item) => (
          <Link key={item.id} to={`/${type}/${item.id}`}>
            <div
              className={`relative flex-shrink-0 w-40 group ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden`}
            >
              <img
                src={
                  item.poster_path
                    ? `${IMG_BASE_URL}${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-2">
                <h3
                  className={`font-semibold text-sm truncate ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.title || item.name}
                </h3>
                <p className="text-gray-500 text-xs">
                  {type === "movie"
                    ? `Movie • ${item.release_date ? item.release_date.slice(0, 4) : "N/A"}`
                    : `TV • ${item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"}`}
                </p>
              </div>

              {/* HoverDescription overlay */}
              <HoverDescription item={item} type={type} theme={theme} />
            </div>
          </Link>
        ))}
      </div>

      {/* Right Chevron */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ListGrid;




