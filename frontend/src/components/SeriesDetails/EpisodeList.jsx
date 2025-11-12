import { useTheme } from "../../context/ThemeContext";

const EpisodeList = ({ episodes }) => {
  const { theme } = useTheme();
  if (!episodes?.length) return null;

  return (
    <div className={`mt-4 border rounded-lg max-h-80 overflow-y-auto ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}>
      <ul>
        {episodes.map((ep, index) => (
          <li key={ep.id} className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer">
            <span className="font-medium">{index + 1}. {ep.name}</span>
            <p className="text-sm text-gray-500">{ep.air_date} • {ep.runtime || "??"} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;

