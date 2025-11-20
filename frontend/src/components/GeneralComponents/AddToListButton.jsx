import useStore from "../../store/useStore";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const AddToListButton = ({ item }) => {
  const { myList, addToList, removeFromList } = useStore();
  const movieId = item.id.toString();
  const isInList = myList.some((m) => m.movieId === movieId);

  const handleClick = () => {
    if (isInList) {
      removeFromList(movieId);
    } else {
      addToList({
        movieId,
        movieTitle: item.title || item.name || "Untitled",
        movieYear: (item.release_date || item.first_air_date || "").split("-")[0],
        poster: item.poster || item.poster_path || item.backdrop_path || "/placeholder.png",
        type: item.media_type || (item.first_air_date ? "tv" : "movie"),
      });
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
