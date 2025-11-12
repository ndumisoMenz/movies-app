import { useNavigate } from "react-router-dom";
import AddToListButton from "../GeneralComponents/AddToListButton";
import { useTheme } from "../../context/ThemeContext";

const MovieActions = ({ movie }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3 mt-5">
      <button
        onClick={() => navigate(`/movie/${movie.id}`)}
        className={`px-5 py-2 rounded-lg font-medium ${
          theme === "dark"
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-yellow-400 text-black hover:bg-yellow-500"
        }`}
      >
        ▶ Play
      </button>
      <AddToListButton item={movie} />
    </div>
  );
};

export default MovieActions;

