import { useEffect, useState } from "react";
import { FiSearch, FiPlay, FiTv } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { FaMagic } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[query,setQuery]=useState("")
  const[results,setResults]=useState([])

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setQuery("")
    setResults([])
  }

  useEffect(()=>{
    const fetchData=async()=>{
      if(query.length<2){
        setResults([]);
        return;
      }
      try{
        const res=await fetch(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1`
        );
        const data=await res.json();
        setResults(data.results || [])
      }catch(err){
        console.error("Search error:",err)
      }
    };
    const delayDebounce=setTimeout(fetchData,400)
    return ()=>clearTimeout(delayDebounce);
  },[query])

  const handleResultClick=(item)=>{
    if(item.media_type==="movie"){
      window.location.href=`/movie/${item.id}`
    }
    else if(item.media_type==="tv"){
      window.location.href=`/tv/${item.id}`
    }
    else{
      window.location.href=`/person/${item.id}`
    }
    handleClose();
  }

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
          <div className="w-full max-w-lg  bg-green-700 rounded-xl p-4 flex flex-col min-h-[320px] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-2">
              <FiSearch className="mx-1 text-white" />
              <input
                className="w-full mx-1 bg-transparent text-white focus:outline-none"
                placeholder="Type a Command or Search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
              />
              <MdOutlineClose
                onClick={handleClose}
                className="mx-1 cursor-pointer text-white"
              />
            </div>
            <hr className="border-white/50" />

            <div className="flex flex-col mt-2 text-white flex-1"> 
              {results.length>0&&(
                <div className="mt-4 max-h-64 overflow-y-auto">
                {results.map((item)=>(
                <div key={item.id} onClick={()=>handleResultClick(item)}
                className="flex items-center cursor-pointer hover:bg-green-600 rounded px-2 py-1">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={item.title || item.name}
                    className="w-12 h-16 object-cover rounded-md"
                  />

                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                      {item.title || item.name}
                    </span>
                    <p className="text-xs text-gray-200">
                      {item.release_date || item.first_air_date || "Unknown"}
                    </p>
                  </div>
                  
                  </div>
              ))}
              </div>
              )}
            </div>

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

