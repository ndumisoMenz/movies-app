import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ListGrid = ({title, movies,type = "movie" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>


      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        
        style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
        }}

      >
        {movies.map((item) => (
          <Link key={item.id} to={`/${type}/${item.id}`}>
          <div
            key={item.id}
            className="flex-shrink-0 w-40 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden"
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
              <h3 className="font-semibold text-sm truncate">{item.title || item.name}</h3>
              <p className="text-gray-500 text-xs">
                {/* Movie • {movie.release_date ? item.release_date.slice(0, 4) : "N/A"} */}
                {type === "movie"
                    ? `Movie • ${item.release_date ? item.release_date.slice(0, 4) : "N/A"}`
                    : `TV • ${item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"}`}

              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ListGrid;

