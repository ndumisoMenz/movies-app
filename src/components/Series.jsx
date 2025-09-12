import { useState, useEffect } from "react";

const GENRES = [
  { id: 1, name: "Action & Adventure", tmdbIds: [28, 12] },
  { id: 2, name: "Animation", tmdbIds: [16] },
  { id: 3, name: "Comedy", tmdbIds: [35] },
  { id: 4, name: "Crime", tmdbIds: [80] },
  { id: 5, name: "Documentary", tmdbIds: [99] },
  { id: 6, name: "Drama", tmdbIds: [18] },
  { id: 7, name: "Family", tmdbIds: [10751] },
  { id: 8, name: "Kids", tmdbIds: [10762] },
  { id: 9, name: "Mystery", tmdbIds: [9648] },
  { id: 10, name: "News", tmdbIds: [10763] },
  { id: 11, name: "Reality", tmdbIds: [10764] },
  { id: 12, name: "Sci-Fi & Fantasy", tmdbIds: [14, 878] },
];

const Series = ({ allSeries,theme }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredSeries, setFilteredSeries] = useState(allSeries);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredSeries(allSeries);
    } else {
      const genre = GENRES.find((g) => g.id === parseInt(selectedGenre));
      setFilteredSeries(
        allSeries.filter((series) =>
          series.genre_ids?.some((id) => genre.tmdbIds.includes(id))
        )
      );
    }
  }, [selectedGenre, allSeries]);

  useEffect(() => {
    setVisibleCount(10);
  }, [filteredSeries]);

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

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">TV Series</h1>
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
        {filteredSeries.slice(0, visibleCount).map((series) => (
          <div key={series.id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
              className="rounded-lg shadow-md"
            />
            <h3 className="mt-2 font-semibold">{series.name}</h3>
            <p className="text-sm text-gray-500">
              TV • {series.first_air_date?.split("-")[0]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Series;
