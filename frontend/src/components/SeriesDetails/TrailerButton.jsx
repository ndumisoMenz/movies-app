import { useTheme } from "../../context/ThemeContext";

const TrailerButton = ({ trailer }) => {
  const { theme } = useTheme();
  if (!trailer) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${trailer.key}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-block mt-6 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 ${
        theme === "dark" ? "bg-yellow-500 text-black" : "bg-yellow-500 text-black"
      }`}
    >
      ▶ Watch Trailer
    </a>
  );
};

export default TrailerButton;

