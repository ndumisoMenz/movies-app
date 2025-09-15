import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import AddToListButton from "../GeneralComponents/AddToListButton";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";



const MovieDetails = () => {
    const{id}=useParams();
    const[movie,setMovie]=useState(null);
    const[credits,setCredits]=useState([])

    useEffect(()=>{
        const fetchMovie=async()=>{
            try{
                const res=await fetch(
                    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
                );
                const data=await res.json();
                setMovie(data)

                const creditsRes=await fetch(
                    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
                );
                const creditsData=await creditsRes.json();
                setCredits(creditsData.cast ||[])

            }catch(err){
                console.error("Error fetching movie details: ",err)
            }
        }
        fetchMovie();
    },[id])

    if(!movie) return <p className="text-white">Loading...</p>
    const trailer=movie.videos?.results?.find(
        (vid)=>vid.type==="Trailer" && vid.site=="YouTube"
    );



  return (
    <div>
        <img 
        src={`${IMG_BASE_URL}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-[90vh] object-cover" 
        />
    <div className="w-screen min-h-screen bg-white text-black p-8">

        <div className="flex flex-col md:flex-row gap-10">
            <img 
                src={
                    movie.poster_path? `${IMG_BASE_URL}${movie.poster_path}`
                    :"https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-72 rounded-xl shadow-lg"
                />
        

        <div className="flex-1">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <div className="flex items-center gap-4 mt-2 text-gray-600">
                <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="px-2 py-1 border rounded">{movie.original_language?.toUpperCase()}</span>
                {movie.adult?(
                    <span className="px-2 py-1 border rounded">18+</span>):
                    (<span className="px-2 py-1 border rounded">PG-13</span>)
                }
            </div>
        

        <div className="flex items-center gap-4 mt-3 text-gray-600">
            <span>📅{movie.release_date}</span>
            <span>⏱ {Math.floor(movie.runtime/60)}hrs {movie.runtime%60}mins</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((genre)=>(
                <span key={genre.id}
                className="px-3 py-1 border rounded-full bg-gray-100 text-gray-700">
                    {genre.name}
                </span>
            ))}
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">{movie.overview}</p>

        <div className="mt-6">
            <AddToListButton item={movie} />
        </div>
      </div>
    </div>

    <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {credits.slice(0,10).map((actor)=>(
                <div key={actor.id} className="flex-shrink-0 w-28 text-center">
                    <img
                        src={
                            actor.profile_path
                            ? `${IMG_BASE_URL}${actor.profile_path}`
                            :"https://via.placeholder.com/150x225?text=NO+Image"
                        }
                        alt={actor.name}
                        className="w-28 h-36 object-cover rounded-lg shadow-md"
                        />
                        <p className="mt-2 text-sm font-medium truncate">{actor.name}</p>
                    </div>

            ))}

        </div>
    

    {/* <div className="absolute bottom-10 left-10 max-w-2xl">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="mt-4">{movie.overview}</p>
        <p className="mt-2 text-gray-300">
            Release Date: {movie.release_date}| Rating: ⭐{movie.vote_average}
        </p>
        {
            trailer &&(<a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400">
                     ▶ Watch Trailer
                </a>
            )
        }
    </div> */}
    </div>
    </div>
    </div>
    
  )
}

export default MovieDetails
