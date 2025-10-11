import { IoMdStar } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";

const Badge = ({ children }) => (
  <span className="px-2 py-0.5 bg-neutral-200 rounded-md text-sm">{children}</span>
);

const MovieMeta = ({ rating, releaseDate, language, mpaaRating }) => (
  <div className="flex items-center gap-4 mt-2 text-gray-700">
    <div className="flex items-center gap-1">
      <IoMdStar className="text-yellow-500" />
      <span>{rating}</span>
    </div>

    <div className="flex items-center gap-1">
      <CiCalendarDate />
      <span>{releaseDate}</span>
    </div>

    {language && <Badge>{language}</Badge>}
    {mpaaRating && <Badge>{mpaaRating}</Badge>}
  </div>
);

export default MovieMeta;
