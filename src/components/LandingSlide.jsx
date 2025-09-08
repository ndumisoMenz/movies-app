import { useState,useEffect } from "react"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const LandingSlide = ({movies}) => {
    const[currentIndex,setCurrentIndex]=useState(0)

    useEffect(()=>{
        if(!movies || movies.length===0) return

        const interval=setInterval(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex+1) % movies.length);
        },15000)

        return()=>clearInterval(interval)
    },[movies])

    if(!movies || movies.length===0){
        return<p className="text-white text-center"> No movies available</p>
    }

    const currentMovie = movies[currentIndex];

    const imageUrl = currentMovie.poster_path
    ? `${IMAGE_BASE_URL}${currentMovie.poster_path}`
    : "/placeholder.png";


    // const imageUrl = currentMovie.backdrop_path
    // ? `${IMAGE_BASE_URL}${currentMovie.backdrop_path}`
    // : "https://via.placeholder.com/800x450?text=No+Image";


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

        <div className="relative w-[800px] h-[450px] overflow-hidden rounded-2xl shadow-lg">

        <img
          src={imageUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute bottom-0 w-full bg-black/60 text-center py-3">
          <h2 className="text-xl md:text-2xl font-bold">{currentMovie.title}</h2>
        </div>

        </div>
      
    </div>
  )
}

export default LandingSlide
