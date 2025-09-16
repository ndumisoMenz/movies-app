import { FiPlay, FiTv } from "react-icons/fi";
import { FaMagic } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

const shortcuts = [
  { icon: <FiPlay className="mx-2" />, label: "Movies" },
  { icon: <FiTv className="mx-2" />, label: "Series" },
  { icon: <FaMagic className="mx-2" />, label: "Anime" },
  { icon: <BiHome className="mx-2" />, label: "Home" },
];

const SearchShortcuts = () => {
  return (
    <div className="flex flex-col mt-2 flex-1">
      <p>Search Movies & Series...</p>
      <div className="flex items-center mt-2">
        <FiPlay />
        <p className="ml-2">Please type a movie or series name</p>
      </div>
      <hr className="my-2 border-gray-300 dark:border-gray-600" />
      <p>Shortcuts...</p>

      <div className="flex-1 flex flex-col justify-around mt-2">
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1"
          >
            {s.icon} {s.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchShortcuts;
