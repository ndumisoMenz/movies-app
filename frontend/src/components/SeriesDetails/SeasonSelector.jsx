import { useTheme } from "../../context/ThemeContext";

const SeasonSelector = ({ seasons, selectedSeason, onChange }) => {
  const { theme } = useTheme();
  if (!seasons?.length) return null;

  return (
    <select
      className={`w-40 border rounded-lg p-2 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-400"}`}
      value={selectedSeason?.season_number || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {seasons.map((season) => (
        <option key={season.id} value={season.season_number}>
          {season.name}
        </option>
      ))}
    </select>
  );
};

export default SeasonSelector;

