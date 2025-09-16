const SearchResultItem = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1"
  >
    <img
      src={
        item.poster_path
          ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
          : "https://via.placeholder.com/92x138?text=No+Image"
      }
      alt={item.title || item.name}
      className="w-12 h-16 object-cover rounded-md"
    />
    <div className="flex flex-col ml-2">
      <span className="font-semibold text-sm">{item.title || item.name}</span>
      <p className="text-xs opacity-70">
        {item.release_date || item.first_air_date || "Unknown"}
      </p>
    </div>
  </div>
);

export default SearchResultItem;
