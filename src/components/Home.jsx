import LandingSlide from "./LandingSlide"
import Navigation from "./Navigation"

const Home = ({movies}) => {
  return (
    <div className="w-screen h-[60vh] lg:h-[50vh] bg-red-700 -mt-4">
      <Navigation/>
      <LandingSlide movies={movies}/>
    </div>
  )
}

export default Home
