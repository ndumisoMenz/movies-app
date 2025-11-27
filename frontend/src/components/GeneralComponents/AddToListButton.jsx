import useStore from "../../store/useStore";
import toast from "react-hot-toast";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const AddToListButton = ({ item }) => {
  const myList = useStore((s) => s.myList);
  const addToList = useStore((s) => s.addToList);
  const removeFromList = useStore((s) => s.removeFromList);
  const isAuthenticated = useStore((s) => s.isAuthenticated());

  const movieId = item.id.toString();
  const isInList = myList.some((m) => m.movieId === movieId);

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your list");
      return;
    }

    if (isInList) {
      removeFromList(movieId);
      toast.success("Removed from your list");
    } else {
      addToList({
        movieId,
        movieTitle: item.title || item.name || "Untitled",
        movieYear: (item.release_date || item.first_air_date || "").split("-")[0],
        poster: item.poster || item.poster_path || item.backdrop_path || "/placeholder.png",
        type: item.media_type || (item.first_air_date ? "tv" : "movie"),
      });
      toast.success("Added to your list!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded border ${
        isInList ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"
      }`}
    >
      {isInList ? "📎 Remove" : "➕ Add to List"}
    </button>
  );
};

export default AddToListButton;

