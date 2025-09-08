import { useEffect, useState } from "react";
import { FiSun,FiMoon  } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";
import Search from "./Search";

const Navigation = ({theme,setTheme}) => {
  const [isOpen, setIsOpen] = useState(false);
  const[toggleTheme,setToggleTheme]=useState(false)
  const[navcolor,setnavColor]=useState('bg-transparent');

  const handleToggle=()=>{
    setToggleTheme(!toggleTheme)
    theme==='light'? setTheme('dark'):setTheme('light')
  }

  useEffect(()=>{
    const handleScroll=()=>{
    const scrollHeight=window.scrollY;
    if (scrollHeight >= 50) {
      setnavColor(theme==='light'? 'bg-white':'bg-black');   // or any Tailwind class you want
    } else {
      setnavColor("bg-transparent");
    }
  }
  window.addEventListener('scroll',handleScroll)

  return()=> window.removeEventListener('scroll',handleScroll)

  },[window.scrollY])
  


  return (
    <nav className={`flex flex-row ${navcolor} justify-center md:justify-between  w-screen mt-2 fixed z-20 opacity-80 py-4 px-7`}>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
  className={`navbar fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex items-center justify-center">
    <h4 className="flex items-center gap-2 text-lg font-bold">
      <MdMovieFilter />Movie App
    </h4>
    <IoCloseCircleOutline
      onClick={() => setIsOpen(false)}
      className={`w-6 h-6 cursor-pointer ${isOpen ? "block" : "hidden"}`}
    />
  </div>

  <ul className="flex flex-col">
    <li className="flex font-bold"><MdMovieFilter />Movies App</li>
    <li><a href='#'>Home</a></li>
    <li><a href="#">Movies</a></li>
    <li><a href="#">TV Shows</a></li>
    <li><a href="#">Anime</a></li>
    <li><a href="#">My List</a></li>
    <li><a href="#">Disclaimer</a></li>
  </ul>
</div>

<ul className="hidden md:flex md:flex-row gap-4">
   <li className="flex font-bold"><MdMovieFilter />Movies App</li>
    <li><a href='#'>Home</a></li>
    <li><a href="#">Movies</a></li>
    <li><a href="#">TV Shows</a></li>
    <li><a href="#">Anime</a></li>
    <li><a href="#">My List</a></li>
    <li><a href="#">Disclaimer</a></li>
</ul>
      
      
      <GiHamburgerMenu onClick={() => setIsOpen(true)} className="md:hidden w-7 h-7"/>
      <div className="flex items-center ml-3 w-4/5 md:w-1/5 flex-row gap-2 mt-2">
          <Search/>
       
        {toggleTheme? <FiMoon className="w-7 h-7 text-white" onClick={handleToggle} />:<FiSun className="w-7 h-7 text-black" onClick={handleToggle}/>}
      </div>
    </nav>
  )
}

export default Navigation
