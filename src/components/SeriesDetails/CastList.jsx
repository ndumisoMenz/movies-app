const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const PLACEHOLDER_PROFILE = "https://via.placeholder.com/150x225?text=No+Image";

const CastList = ({ credits }) => {
  if (!credits?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {credits.slice(0, 10).map((actor) => (
          <div key={actor.id} className="flex-shrink-0 w-24 text-center">
            <img
              src={
                actor.profile_path
                  ? `${IMG_BASE_URL}${actor.profile_path}`
                  : PLACEHOLDER_PROFILE
              }
              alt={actor.name}
              className="w-28 h-36 object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm font-medium truncate">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
