import { useContext } from "react";
import { ListContext } from "../context/ListContext";

const AddToListButton = ({ item }) => {
  const { myList, addToList, removeFromList } = useContext(ListContext);

  const isInList = myList.some((m) => m.id === item.id);

  const getPosterUrl = () => {
    if (item.poster) return item.poster; // already a full url
    if (item.poster_path) return `${IMG_BASE_URL}${item.poster_path}`;
    if (item.backdrop_path) return `${IMG_BASE_URL}${item.backdrop_path}`;
    return "/placeholder.png"; // fallback
  };

  return (
    <button
      className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
      onClick={() =>
        isInList
          ? removeFromList(item.id)
          : addToList({
              id: item.id,
              title: item.title || item.name, // TMDB uses 'name' for series
              poster: getPosterUrl(),
              year: item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
              type: item.media_type || (item.first_air_date ? "tv" : "movie"), // auto detect
            })
      }
    >
      {isInList ? "📎 Remove" : "➕ Add to List"}
    </button>
  );
};

export default AddToListButton;
