// import { useContext } from "react"
// import { ListContext } from "../../context/ListContext"

// const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

// const Mylist = ({theme}) => {
//   const{myList,removeFromList}=useContext(ListContext)

//   const moviesList = myList.filter((item) => item.type === "movie");
//   const seriesList = myList.filter((item) => item.type === "tv");

//   return (
//     <div className={`w-screen flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
//         <div className="self-center text-center mt-40">
//             <h1 className="text-3xl font-bold">My List -Movies App</h1>
//             <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>CORS-Approved List</p>
//         </div>

//         <h2 className="mt-10 text-2xl font-semibold">Your Movies</h2>
//       {moviesList.length === 0 ? (
//         <p className="mt-5 text-gray-400">No movies in your list yet.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
//           {moviesList.map((movie) => (
//             <div
//               key={movie.id}
//               className={`rounded-xl shadow-md overflow-hidden relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}

//             >
//               <img
//                 src={movie.poster || `${IMG_BASE_URL}${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full h-72 object-cover"
//               />
//               <div className="p-3">
//                 <h3 className="font-bold text-lg">{movie.title}</h3>
//                 <p className="text-sm text-gray-500">Movie • {movie.year}</p>
//               </div>
//               <button
//                 onClick={() => removeFromList(movie.id)}
//                 className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
//               >
//                 ✖
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
      
//       <h2 className="mt-10 text-2xl font-semibold">Your Series</h2>
//       {seriesList.length === 0 ? (
//         <p className="mt-5 text-gray-400">No series in your list yet.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
//           {seriesList.map((series) => (
//             <div
//               key={series.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden relative"
//             >
//               <img
//                 src={series.poster || `${IMG_BASE_URL}${series.poster_path}`}
//                 alt={series.title}
//                 className="w-full h-72 object-cover"
//               />
//               <div className="p-3">
//                 <h3 className="font-bold text-lg">{series.title}</h3>
//                 <p className="text-sm text-gray-500">TV • {series.year}</p>
//               </div>
//               <button
//                 onClick={() => removeFromList(series.id)}
//                 className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
//               >
//                 ✖
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

      
//     </div>
//   )
// }

// export default Mylist

import { useContext } from "react";
import { ListContext } from "../../context/ListContext";
import { ThemeContext } from "../../context/ThemeContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Mylist = () => {
  const { myList, removeFromList } = useContext(ListContext);
  const { theme } = useContext(ThemeContext);

  const moviesList = myList.filter((item) => item.type === "movie");
  const seriesList = myList.filter((item) => item.type === "tv");

  return (
    <div
      className={`w-screen flex flex-col min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="self-center text-center mt-40">
        <h1 className="text-3xl font-bold">My List - Movies App</h1>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
          CORS-Approved List
        </p>
      </div>

      {/* Movies Section */}
      <h2 className="mt-10 text-2xl font-semibold">Your Movies</h2>
      {moviesList.length === 0 ? (
        <p className="mt-5 text-gray-400">No movies in your list yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
          {moviesList.map((movie) => (
            <div
              key={movie.id}
              className={`rounded-xl shadow-md overflow-hidden relative ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={movie.poster || `${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-500">Movie • {movie.year}</p>
              </div>
              <button
                onClick={() => removeFromList(movie.id)}
                className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Series Section */}
      <h2 className="mt-10 text-2xl font-semibold">Your Series</h2>
      {seriesList.length === 0 ? (
        <p className="mt-5 text-gray-400">No series in your list yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
          {seriesList.map((series) => (
            <div
              key={series.id}
              className={`rounded-xl shadow-md overflow-hidden relative ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={series.poster || `${IMG_BASE_URL}${series.poster_path}`}
                alt={series.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h3 className="font-bold text-lg">{series.title}</h3>
                <p className="text-sm text-gray-500">TV • {series.year}</p>
              </div>
              <button
                onClick={() => removeFromList(series.id)}
                className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mylist;

