const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const PLACEHOLDER_POSTER = "https://via.placeholder.com/500x750?text=No+Image";

const SeriesInfo = ({ series }) => {
  const {
    poster_path,
    name,
    vote_average,
    original_language,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    genres,
    overview,
  } = series;

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <img
        src={poster_path ? `${IMG_BASE_URL}${poster_path}` : PLACEHOLDER_POSTER}
        alt={name}
        className="w-72 rounded-xl shadow-lg"
      />

      <div className="flex-1">
        <h1 className="text-4xl font-bold">{name}</h1>

        <div className="flex items-center gap-4 mt-2 text-gray-600">
          {vote_average && (
            <span className="flex items-center gap-1 text-yellow-600 font-semibold">
              ⭐ {vote_average.toFixed(1)}
            </span>
          )}
          {original_language && (
            <span className="px-2 py-1 border rounded">
              {original_language.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-gray-600">
          {first_air_date && <span>📅 {first_air_date}</span>}
          <span>
            📺 {number_of_seasons} seasons ({number_of_episodes} episodes)
          </span>
        </div>

        {genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 border rounded-full bg-gray-100 text-gray-700"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {overview && (
          <p className="mt-6 text-gray-700 leading-relaxed">{overview}</p>
        )}
      </div>
    </div>
  );
};

export default SeriesInfo;
