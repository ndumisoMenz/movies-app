import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToListButton from "../GeneralComponents/AddToListButton";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        const data = await res.json();
        setSeries(data);

        const creditsRes = await fetch(
          `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsRes.json();
        setCredits(creditsData.cast || []);
      } catch (err) {
        console.error("Error fetching series details: ", err);
      }
    };
    fetchSeries();
  }, [id]);

  if (!series) return <p className="text-white">Loading...</p>;

  const trailer = series.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div>
      <img
        src={`${IMG_BASE_URL}${series.backdrop_path}`}
        alt={series.name}
        className="w-full h-[90vh] object-cover"
      />

      <div className="w-screen min-h-screen bg-white text-black p-8">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={
              series.poster_path
                ? `${IMG_BASE_URL}${series.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={series.name}
            className="w-72 rounded-xl shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold">{series.name}</h1>

            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                ⭐ {series.vote_average?.toFixed(1)}
              </span>
              <span className="px-2 py-1 border rounded">
                {series.original_language?.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-gray-600">
              <span>📅 {series.first_air_date}</span>
              <span>
                📺 {series.number_of_seasons} seasons ({series.number_of_episodes} episodes)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {series.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 border rounded-full bg-gray-100 text-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {series.overview}
            </p>

            <div className="mt-6">
              <AddToListButton item={series} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {credits.slice(0, 10).map((actor) => (
              <div key={actor.id} className="flex-shrink-0 w-28 text-center">
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_BASE_URL}${actor.profile_path}`
                      : "https://via.placeholder.com/150x225?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-28 h-36 object-cover rounded-lg shadow-md"
                />
                <p className="mt-2 text-sm font-medium truncate">
                  {actor.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
          >
            ▶ Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
};

export default SeriesDetails;
