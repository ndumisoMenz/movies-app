import LandingSlide from "./LandingSlide"
import Navigation from "../GeneralComponents/Navigation"
import ListGrid from "../GeneralComponents/ListGrid"
import Mylist from "../GeneralComponents/Mylist"
import Movies from "../Movie/Movies";

const Home = ({allMovies,movies,trending,topRated,seriesPopular,seriesTrending,seriesTopRated,theme,setTheme}) => {
  return (
    <div className="w-screen h-[80vh] lg:h-[70vh] -mt-4">
      <LandingSlide movies={movies}/>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Movies" movies={trending} type="movie"  />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Movies" movies={movies} type="movie" />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Movies" movies={topRated} type="movie" />
      </div>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Series" movies={seriesTrending} type="series"  />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Series" movies={seriesPopular} type="series"  />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Series" movies={seriesTopRated} type="series"  />
      </div>
    </div>
  )
}

export default Home
