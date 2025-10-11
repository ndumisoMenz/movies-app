const EpisodeList = ({ episodes }) => {
  if (!episodes?.length) return null;

  return (
    <div className="mt-4 border rounded-lg max-h-80 overflow-y-auto">
      <ul>
        {episodes.map((ep, index) => (
          <li key={ep.id} className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">
              {index + 1}. {ep.name}
            </span>
            <p className="text-sm text-gray-600">
              {ep.air_date} • {ep.runtime || "??"} min
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ This line must exist
export default EpisodeList;
