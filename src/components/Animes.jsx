import { useState, useEffect } from "react";

const GENRES = [
  { id: 1, name: "Action & Adventure", tmdbIds: [16, 28, 12] },
  { id: 2, name: "Animation", tmdbIds: [16] },
  { id: 3, name: "Comedy", tmdbIds: [35] },
  { id: 4, name: "Drama", tmdbIds: [18] },
  { id: 5, name: "Fantasy", tmdbIds: [14] },
  { id: 6, name: "Sci-Fi & Fantasy", tmdbIds: [14, 878] },
  { id: 7, name: "Kids", tmdbIds: [10762] },
];

const Animes = ({ allAnimes,theme }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredAnimes, setFilteredAnimes] = useState(allAnimes);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredAnimes(allAnimes);
    } else {
      const genre = GENRES.find((g) => g.id === parseInt(selectedGenre));
      setFilteredAnimes(
        allAnimes.filter((anime) =>
          anime.genre_ids?.some((id) => genre.tmdbIds.includes(id))
        )
      );
    }
  }, [selectedGenre, allAnimes]);

  useEffect(() => {
    setVisibleCount(10);
  }, [filteredAnimes]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setVisibleCount((prev) => prev + 10);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!allAnimes || allAnimes.length === 0) {
    return <p className="text-center mt-10">Loading animes...</p>;
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Anime</h1>
        <div className="flex justify-center mb-6">
          <select
            className={`w-32 md:w-64 h-10 rounded-lg border-2 border-gray-400 ${theme === "dark" 
                ? "bg-black text-white border-gray-600" 
                : "bg-white text-black border-gray-400"}`}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredAnimes.slice(0, visibleCount).map((anime) => (
          <div key={anime.id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
              alt={anime.name || anime.title}
              className="rounded-lg shadow-md"
            />
            <h3 className="mt-2 font-semibold">{anime.name || anime.title}</h3>
            <p className="text-sm text-gray-500">
              Anime • {anime.first_air_date?.split("-")[0] || anime.release_date?.split("-")[0]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Animes;
