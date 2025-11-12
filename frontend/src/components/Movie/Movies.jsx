import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
];

const Movies = ({ allMovies }) => {
  const { theme } = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(allMovies);
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(
        allMovies.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        )
      );
    }
  }, [selectedGenre, allMovies]);

  useEffect(() => {
    setVisibleCount(2 * 5);
  }, [filteredMovies]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setVisibleCount((prev) => prev + 2 * 5);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
        <div className="flex justify-center mb-6">
          <select
            className={`w-32 md:w-64 h-10 rounded-lg border-2 ${
              theme === "dark"
                ? "bg-black text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Genre
            </option>
            {GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        {filteredMovies.slice(0, visibleCount).map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="text-center cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-md"
            />
            <h3 className="mt-2 font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-500">
              Movie • {movie.release_date?.split("-")[0]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
