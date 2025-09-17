const SeasonSelector = ({ seasons, selectedSeason, onChange }) => {
  if (!seasons?.length) return null;

  return (
    <select
      className="w-40 border rounded-lg p-2"
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
