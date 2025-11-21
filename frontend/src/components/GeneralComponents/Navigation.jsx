import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useTheme } from "../../context/ThemeContext";
import useStore from "../../store/useStore";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "TV Shows" },
  { to: "/animes", label: "Anime" },
  { to: "/mylist", label: "My List" },
  { to: "/disclaimer", label: "Disclaimer" },
];

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      {theme === "dark" ? (
        <FiSun className="w-7 h-7 text-yellow-400" />
      ) : (
        <FiMoon className="w-7 h-7 text-gray-800" />
      )}
    </div>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, theme, user, logout, navigate }) => (
  <div
    className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 md:hidden 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
  >
    <div className="flex items-center justify-between p-4">
      <h4 className="flex items-center gap-2 text-lg font-bold">
        <MdMovieFilter /> Movie App
      </h4>
      <IoCloseCircleOutline
        onClick={() => setIsOpen(false)}
        className="w-6 h-6 cursor-pointer"
      />
    </div>
    <ul>
      {NAV_LINKS.map((link) => (
        <li key={link.to} className="border-b-2 border-neutral-300 mx-4">
          <NavLink
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={theme === "dark" ? "text-white" : "text-black"}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>

    <div className="p-4">
      {!user ? (
        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/login");
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={async () => {
            await logout();
            setIsOpen(false);
            navigate("/login");
          }}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      )}
    </div>
  </div>
);

const DesktopMenu = ({ theme }) => (
  <ul className="hidden md:flex md:flex-row gap-4 items-center">
    <li
      className={`flex font-bold items-center gap-2 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <MdMovieFilter /> Movie App
    </li>
    {NAV_LINKS.map((link) => (
      <li key={link.to}>
        <NavLink
          to={link.to}
          className={({ isActive }) =>
            `px-2 py-1 rounded-md hover:bg-stone-300 dark:hover:bg-stone-700 ${
              theme === "dark" ? "text-white" : "text-black"
            } ${isActive ? "underline underline-offset-4 font-semibold" : ""}`
          }
        >
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBg, setNavBg] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBg(
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        );
      } else {
        setNavBg(
          theme === "light"
            ? "bg-transparent text-black"
            : "bg-transparent text-white"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  return (
    <nav
      className={`fixed top-0 left-0 w-screen z-50 py-4 px-7 flex justify-between items-center transition-colors duration-300 ${navBg}`}
    >
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        theme={theme}
        user={user}
        logout={logout}
        navigate={navigate}
      />

      <DesktopMenu theme={theme} />

      <div className="flex items-center gap-3 ml-3">
        <GiHamburgerMenu
          onClick={() => setIsOpen(true)}
          className={`md:hidden w-7 h-7 cursor-pointer ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        />

        <Search />
        <ThemeToggle />

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 rounded-lg h-10 w-56 text-white font-semibold"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="bg-red-600 rounded-lg h-10 w-56 text-white font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;



