import React from "react";

const HoverDescription = ({ item, type, theme }) => {
  return (
    <div
      className={`absolute top-2 left-2 right-2 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-lg rounded-lg p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
    >
      {/* Title + Year */}
      <h4 className="font-bold">
        {item.title || item.name}{" "}
        {item.release_date
          ? `(${item.release_date.slice(0, 4)})`
          : item.first_air_date
          ? `(${item.first_air_date.slice(0, 4)})`
          : ""}
      </h4>

      {/* Rating */}
      {item.vote_average && (
        <span className="inline-block mt-1 text-xs font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md">
          {item.vote_average.toFixed(1)}
        </span>
      )}

      {/* Description */}
      <p className="mt-2 text-xs line-clamp-3">
        {item.overview || "No description available."}
      </p>

      {/* Date */}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {type === "movie"
          ? item.release_date
            ? new Date(item.release_date).toDateString()
            : "Unknown"
          : item.first_air_date
          ? new Date(item.first_air_date).toDateString()
          : "Unknown"}
      </p>
    </div>
  );
};

export default HoverDescription;
