import LandingSlide from "./LandingSlide"
import Navigation from "./Navigation"
import ListGrid from "./ListGrid"
import Mylist from "./Mylist"

const Home = ({movies,trending,topRated,theme,setTheme}) => {
  return (
    <div className="w-screen h-[80vh] lg:h-[70vh] -mt-4">
      <Navigation theme={theme} setTheme={setTheme}/>
      <LandingSlide movies={movies}/>

      <div className="px-6 mt-10">
        <ListGrid title="Trending Movies" movies={trending} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Popular Movies" movies={movies} />
      </div>
      <div className="px-6 mt-10">
        <ListGrid title="Top Rated Movies" movies={topRated} />
      </div>

      <Mylist/>
  
    </div>
  )
}

export default Home
