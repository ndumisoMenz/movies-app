import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import SeriesHeader from "./SeriesHeader";
import SeriesInfo from "./SeriesInfo";
import CastList from "./CastList";
import TrailerButton from "./TrailerButton";
import SeasonSelector from "./SeasonSelector";
import EpisodeList from "./EpisodeList";
import AddToListButton from "../GeneralComponents/AddToListButton";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const SeriesDetails = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [credits, setCredits] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const fetchSeasonDetails = useCallback(
    async (seasonNumber) => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setSelectedSeason(data);
      } catch (err) {
        console.error("Error fetching season:", err);
      }
    },
    [id]
  );

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const [seriesRes, creditsRes] = await Promise.all([
          fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`),
          fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`),
        ]);

        const seriesData = await seriesRes.json();
        const creditsData = await creditsRes.json();

        setSeries(seriesData);
        setCredits(creditsData.cast || []);

        if (seriesData.seasons?.length > 0) {
          fetchSeasonDetails(seriesData.seasons[0].season_number);
        }
      } catch (err) {
        console.error("Error fetching series details:", err);
      }
    };

    fetchSeriesData();
  }, [id, fetchSeasonDetails]);

  if (!series) return <p className="text-white">Loading...</p>;

  const trailer = series.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <SeriesHeader backdrop={series.backdrop_path} title={series.name} />

      <div className="flex flex-col lg:flex-row w-screen">
        {/* Left: Main info */}
        <div className={`w-full lg:w-[75vw] min-h-screen p-8`}>
          <SeriesInfo series={series} />

          <div className="mt-6">
            <AddToListButton item={series} />
          </div>

          <CastList credits={credits} />

          <TrailerButton trailer={trailer} />
        </div>

        {/* Right: Seasons/Episodes */}
        <aside className="w-full lg:w-[25vw] p-4">
          <h1 className="text-3xl font-bold mb-4">{series.name}</h1>

          <SeasonSelector
            seasons={series.seasons}
            selectedSeason={selectedSeason}
            onChange={fetchSeasonDetails}
          />

          <EpisodeList episodes={selectedSeason?.episodes} />
        </aside>
      </div>
    </div>
  );
};

export default SeriesDetails;
