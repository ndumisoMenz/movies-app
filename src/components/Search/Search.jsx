import { useState, useRef, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchResultItem from "./SearchResultItem";
import SearchShortcuts from "./SearchShortcuts";
import { useSearch } from "./useSearch";

const Search = ({ theme }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const inputRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleResultClick = (item) => {
    if (item.media_type === "movie") navigate(`/movie/${item.id}`);
    else if (item.media_type === "tv") navigate(`/series/${item.id}`);
    else navigate(`/person/${item.id}`);
    handleClose();
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex w-full bg-white text-black rounded-xl hover:bg-gray-100 h-10 items-center px-3 cursor-pointer justify-between"
      >
        <span className="text-gray-500">Search...</span>
        <span className="flex items-center gap-1 text-sm text-gray-400 border border-gray-200 rounded-md px-2 py-0.5 bg-gray-50">
          ⌘ K
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-xl p-4 flex flex-col min-h-[320px] overflow-y-auto ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >

            <div className="flex justify-between items-center mb-2">
              <FiSearch className="mx-1" />
              <input
                ref={inputRef}
                className="w-full mx-1 bg-transparent focus:outline-none"
                placeholder="Type a Command or Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <MdOutlineClose onClick={handleClose} className="mx-1 cursor-pointer" />
            </div>
            <hr className="border-gray-300 dark:border-gray-600" />

            {results.length > 0 && (
              <div className="mt-4 max-h-64 overflow-y-auto">
                {results.map((item) => (
                  <SearchResultItem key={item.id} item={item} onClick={handleResultClick} />
                ))}
              </div>
            )}

            <SearchShortcuts />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

