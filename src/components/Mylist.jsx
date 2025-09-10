import { useContext } from "react"
import { ListContext } from "../context/ListContext"

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Mylist = () => {
  const{myList,removeFromList}=useContext(ListContext)
  return (
    <div className="w-screen flex flex-col">
        <div className="self-center text-center mt-40">
            <h1 className="text-3xl font-bold">My List -Movies App</h1>
            <p className="text-gray-500">CORS-Approved List</p>
        </div>
        <h1 className="mt-10 text-2xl font-semibold">Your Movies</h1>
        {myList.length===0?(
          <p className="mt-5 text-gray-400">No movies in your list yet.</p>
        ):(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
        {myList.map((movie)=>(
          <div key={movie.id} className="bg-white rounded-xl shadow-md overflow-hidden relative">
            <img 
              src={movie.poster || `${IMG_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"/>
              <div className="p-3">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-500">Movie• {movie.year}</p>
              </div>
              <button onClick={()=>removeFromList(movie.id)}
                className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"> 
                ✖
              </button>
              </div>
        ))}
        </div>
      )}
      
      <h1 className="self-start">Your Series</h1>
      
    </div>
  )
}

export default Mylist
