import { useState,useEffect, useContext } from "react"
import { IoMdStar } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { ListContext } from "../context/ListContext";
import AddToListButton from "./AddToListButton";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const LandingSlide = ({movies}) => {
    const[currentIndex,setCurrentIndex]=useState(0)
    const{addToList,myList,removeFromList}=useContext(ListContext)

    const navigate=useNavigate()

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

    const isInList=myList.some((m)=>m.id===currentMovie.id)


  return (

<div
  className=" flex items-end w-full h-full relative transition-all duration-700 z-0">
<img
    src={imageUrl}
    alt={currentMovie.title}
    className="absolute inset-0 w-screen h-full cover -z-10"
    
  />



  <div className="w-full md:w-[480px] lg:w-[640px] text-white ml-4 mb-2">
      <h1 className="text-3xl font-bold">{currentMovie.title}</h1>

      <div className="flex items-center gap-4 mt-2 text-gray-700">
        <div className="flex items-center gap-1">
          <IoMdStar className="text-yellow-500" />
          <span>{currentMovie.vote_average}</span>
        </div>

        <div className="flex items-center gap-1">
          <CiCalendarDate />
          <span>{currentMovie.release_date}</span>
        </div>

        <span className="px-2 py-0.5 bg-neutral-200 rounded-md text-sm">
          {currentMovie.language}
        </span>

        <span className="px-2 py-0.5 bg-neutral-200 rounded-md text-sm">
          {currentMovie.mpaaRating}
        </span>
      </div>
      <p className="mt-3">{currentMovie.overview}</p>
      <div className="flex items-center gap-3 mt-5">
        <button onClick={() => navigate(`/movie/${currentMovie.id}`)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-5 py-2 rounded-lg">
          ▶ Play
        </button>
        <AddToListButton item={currentMovie}/>
      </div>
    </div>
</div>
  )
}

export default LandingSlide
