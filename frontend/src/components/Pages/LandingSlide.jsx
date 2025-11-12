import { useContext } from "react";
import { ListContext } from "../../context/ListContext";
import { useCarousel } from "../../hooks/useCarousel";
import MovieMeta from "../Movie/MovieMeta";
import MovieActions from "../Movie/MovieActions";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function getImageUrl(path, size = "w1280") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : "/placeholder.png";
}

const LandingSlide = ({ movies }) => {
  const { myList } = useContext(ListContext);
  const [currentIndex] = useCarousel(movies, 15000);

  if (!movies || movies.length === 0) {
    return <p className="text-white text-center">No movies available</p>;
  }

  const currentMovie = movies[currentIndex];
  const imageUrl = getImageUrl(currentMovie?.poster_path, "w1280"); // higher resolution
  const imageOriginalUrl = getImageUrl(currentMovie?.poster_path, "original");
  const isInList = myList.some((m) => m.id === currentMovie?.id);

  return (
    <div className="flex items-end w-full h-full relative transition-all duration-700 z-0">
      <img
        src={imageUrl}
        srcSet={`${imageUrl} 1280w, ${imageOriginalUrl} 1920w`}
        sizes="100vw"
        alt={currentMovie?.title}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        loading="lazy"
      />

      <div className="w-full md:w-[480px] lg:w-[640px] text-white ml-4 mb-2">
        <h1 className="text-3xl font-bold">{currentMovie?.title}</h1>

        <MovieMeta
          rating={currentMovie?.vote_average}
          releaseDate={currentMovie?.release_date}
          language={currentMovie?.language}
          mpaaRating={currentMovie?.mpaaRating}
        />

        <p className="mt-3">{currentMovie?.overview}</p>
        <MovieActions movie={currentMovie} isInList={isInList} />
      </div>
    </div>
  );
};

export default LandingSlide;

