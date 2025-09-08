import { useState } from "react";
import { FiSearch, FiPlay, FiTv } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { FaMagic } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div
        onClick={handleOpen}
        className="flex w-full bg-white rounded-xl hover:bg-gray-100 h-10 items-center px-3 cursor-pointer justify-between"
      >
        <span className="text-gray-500">Search...</span>

        <span className="flex items-center gap-1 text-sm text-gray-400 border border-gray-200 rounded-md px-2 py-0.5 bg-gray-50">
            ⌘ K
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-green-700 rounded-xl p-4 flex flex-col min-h-[320px] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-2">
              <FiSearch className="mx-1 text-white" />
              <input
                className="w-full mx-1 bg-transparent text-white focus:outline-none"
                placeholder="Type a Command or Search"
              />
              <MdOutlineClose
                onClick={handleClose}
                className="mx-1 cursor-pointer text-white"
              />
            </div>
            <hr className="border-white/50" />

            
            <div className="flex flex-col mt-2 text-white flex-1">
              <p>Search Movies & Series...</p>
              <div className="flex items-center mt-2">
                <FiSearch />
                <p className="ml-2">Please type a movie or series name</p>
              </div>
              <hr className="border-white/50 my-2" />
              <p>Shortcuts...</p>

              
              <div className="flex-1 flex flex-col justify-around mt-2">
                <div className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1">
                  <FiPlay className="mx-2 text-white" /> Movies
                </div>
                <div className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1">
                  <FiTv className="mx-2 text-white" /> Series
                </div>
                <div className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1">
                  <FaMagic className="mx-2 text-white" /> Anime
                </div>
                <div className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1">
                  <BiHome className="mx-2 text-white" /> Home
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

