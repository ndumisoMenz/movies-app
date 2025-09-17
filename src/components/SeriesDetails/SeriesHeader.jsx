const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const SeriesHeader = ({ backdrop, title }) => (
  <img
    src={`${IMG_BASE_URL}${backdrop}`}
    alt={title}
    className="w-full h-[90vh] object-cover"
  />
);

export default SeriesHeader;
