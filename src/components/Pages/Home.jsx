import LandingSlide from "./LandingSlide"
import ListGrid from "../GeneralComponents/ListGrid"
import Mylist from "../GeneralComponents/Mylist"
import Movies from "../Movie/Movies";

const Home = ({allMovies,movies,trending,topRated,seriesPopular,seriesTrending,seriesTopRated,theme,setTheme}) => {
  return (
    <div className="w-screen h-[80vh] lg:h-[70vh] -mt-4">
      <LandingSlide movies={movies}/>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Movies" movies={trending} type="movie" theme={theme} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Movies" movies={movies} type="movie" theme={theme}/>
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Movies" movies={topRated} type="movie" theme={theme} />
      </div>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Series" movies={seriesTrending} type="series" theme={theme} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Series" movies={seriesPopular} type="series" theme={theme}  />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Series" movies={seriesTopRated} type="series" theme={theme} />
      </div>
    </div>
  )
}

export default Home
