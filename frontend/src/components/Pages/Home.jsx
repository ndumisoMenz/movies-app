import React from "react";
import LandingSlide from "./LandingSlide";
import ListGrid from "../GeneralComponents/ListGrid";
import { useTheme } from "../../context/ThemeContext";

const Home = ({
  allMovies,
  movies,
  trending,
  topRated,
  seriesPopular,
  seriesTrending,
  seriesTopRated,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] -mt-4 overflow-hidden relative">
        <LandingSlide movies={movies} />
      </div>

      {/* Grid Content */}
      <div className="px-6 mt-10">
        <ListGrid title="Trending Movies" movies={trending} type="movie" theme={theme} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Movies" movies={movies} type="movie" theme={theme} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Movies" movies={topRated} type="movie" theme={theme} />
      </div>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Series" movies={seriesTrending} type="series" theme={theme} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Series" movies={seriesPopular} type="series" theme={theme} />
      </div>
      <div className="px-6 mt-10 pb-10">
        <ListGrid title="Top Rated Series" movies={seriesTopRated} type="series" theme={theme} />
      </div>
    </div>
  );
};

export default Home;

