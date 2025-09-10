import { useState,useEffect } from "react"

const GENRES=[
        {id:28,name:"Action"},
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
    ]

const Movies = ({allMovies}) => {
    const[selectdGenre,setSelectedGenre]=useState("")
    const[filteredMovies,setFilteredMovies]=useState(allMovies)

    const[visibleCount,setVisibleCount]=useState(0)

    useEffect(()=>{
        if(!selectdGenre){
            setFilteredMovies(allMovies)
        }else{
            setFilteredMovies(
                allMovies.filter((movie)=>
                movie.genre_ids.includes(parseInt(selectdGenre))
                )
            )
        }
    },[selectdGenre,allMovies])

    useEffect(()=>{
        setVisibleCount(2*5)
    },[filteredMovies])
   
    useEffect(()=>{
        function handleScroll(){
            if(
                window.innerHeight+window.scrollY>=
                document.documentElement.scrollHeight-100
            ){
                setVisibleCount((prev)=>prev +2*5)
            }
        }
        window.addEventListener('scroll',handleScroll);
        return()=>window.removeEventListener('scroll',handleScroll)
    },[])

  return (
    <>
    <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
        <div className="flex justify-center mb-6">
            <select className="w-32 md:w-64 h-10 rounded-lg border-2 border-gray-400" 
            value={selectdGenre} onChange={(e)=>setSelectedGenre(e.target.value)}>

                <option value="" disabled hidden>Select Genre</option>
                {GENRES.map((genre)=>(
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}

            </select>
        </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredMovies.slice(0,visibleCount).map((movie)=>(
            <div key={movie.id} className="text-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-md"
                />
                <h3 className="mt-2 font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-500">
                    Movie • {movie.release_date?.split("-")[0]}
                </p>
            </div>
        ))}

    </div>

    {/* <div className="flex justify-center w-screen h-auto">
      <select className="w-32 md:w-64 h-10 rounded-lg border-2 border-gray-400">
        <option value="" disabled selected hidden>Select Genre</option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="animation">Animation</option>
        <option value="comedy">Comedy</option>
        <option value="crime">Crime</option>
        <option value="documentary">Documentary</option>
        <option value="drama">Drama</option>
        <option value="family">Family</option>
        <option value="fantasy">Fantasy</option>
        <option value="history">History</option>
        <option value="horror">Horror</option>
        <option value="music">Music</option>
        
      </select>
    </div> */}
    </>
  )
}

export default Movies
