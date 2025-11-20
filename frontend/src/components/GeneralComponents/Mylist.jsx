import { useEffect } from "react";
import useStore from "../../store/useStore";
import { useTheme } from "../../context/ThemeContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MyList = () => {
  const { myList, fetchList, removeFromList } = useStore();
  const { theme } = useTheme();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const moviesList = myList.filter((i) => i.type === "movie");
  const seriesList = myList.filter((i) => i.type === "tv");

  const getPosterUrl = (poster) => {
    if (!poster) return "/placeholder.png";
    return poster.startsWith("http") ? poster : `${IMG_BASE_URL}${poster}`;
  };

  return (
    <div className={`w-screen min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl font-bold text-center mt-10">My List</h1>

      <h2 className="mt-10 text-2xl font-semibold">Movies</h2>
      {moviesList.length === 0 ? <p>No movies yet</p> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {moviesList.map((movie) => (
            <div key={movie.movieId || movie._id} className={`shadow p-2 rounded relative ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <img src={getPosterUrl(movie.poster)} className="w-full h-56 object-cover rounded" />
              <h3 className="font-bold">{movie.movieTitle}</h3>
              <p>{movie.movieYear}</p>

              <button
                onClick={() => removeFromList(movie.movieId)}
                className={`absolute top-2 right-2 p-2 rounded-full hover:bg-red-500 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-2xl font-semibold">Series</h2>
      {seriesList.length === 0 ? <p>No series yet</p> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {seriesList.map((s) => (
            <div key={s.movieId || s._id} className={`shadow p-2 rounded relative ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <img src={getPosterUrl(s.poster)} className="w-full h-56 object-cover rounded" />
              <h3 className="font-bold">{s.movieTitle}</h3>
              <p>{s.movieYear}</p>

              <button
                onClick={() => removeFromList(s.movieId)}
                className={`absolute top-2 right-2 p-2 rounded-full hover:bg-red-500 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
