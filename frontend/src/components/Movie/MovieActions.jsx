import { useNavigate } from "react-router-dom";
import AddToListButton from "../GeneralComponents/AddToListButton";

const MovieActions = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mt-5">
      <button
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-5 py-2 rounded-lg"
      >
        ▶ Play
      </button>
      <AddToListButton item={movie} />
    </div>
  );
};

export default MovieActions;
