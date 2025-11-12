import { useTheme } from "../../context/ThemeContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const SeriesHeader = ({ backdrop, title }) => {
  const { theme } = useTheme();

  return (
    <img
      src={`${IMG_BASE_URL}${backdrop}`}
      alt={title}
      className={`w-full h-[90vh] object-cover ${theme === "dark" ? "opacity-90" : ""}`}
    />
  );
};

export default SeriesHeader;

