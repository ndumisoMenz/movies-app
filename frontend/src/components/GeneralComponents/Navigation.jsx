import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Search from "../Search/Search";
import { useTheme } from "../../context/ThemeContext";
import useStore from "../../store/useStore";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

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
    <button
      onClick={toggleTheme}
      className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-600 text-white transition"
    >
      {theme === "dark" ? (
        <FiSun className="w-6 h-6 text-yellow-400" />
      ) : (
        <FiMoon className="w-6 h-6 text-gray-100" />
      )}
    </button>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBg, setNavBg] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const { theme } = useTheme();
  const navigate = useNavigate();

  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBg(
          theme === "light"
            ? "bg-white text-black shadow-md"
            : "bg-black text-white shadow-md"
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

  // 🔒 Protect My List
  const handleProtectedRoute = (e, path) => {
    if (path === "/mylist" && !user) {
      e.preventDefault();
      toast.error("Please login to access My List 🔒");
    }
  };

  // Modal controls
  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-screen z-50 py-4 px-7 flex justify-between items-center transition-colors duration-300 ${navBg}`}
      >
        
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        
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
                onClick={(e) => handleProtectedRoute(e, link.to)}
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

        
        <div className="flex items-center gap-4">
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
              onClick={openLoginModal}
              className="bg-blue-600 rounded-lg h-12 w-56 text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={async () => {
                await logout();
                navigate("/");
                toast.success("Logged out successfully 👋");
              }}
              className="bg-red-600 rounded-lg h-12 w-56 text-lg font-semibold shadow-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={closeLoginModal}
              className="absolute -top-3 -right-3 text-white text-3xl font-bold bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 transition"
            >
              &times;
            </button>

            <Login
              closeModal={closeLoginModal}
              openRegisterModal={openRegisterModal}
            />
          </div>
        </div>
      )}

      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={closeRegisterModal}
              className="absolute -top-3 -right-3 text-white text-3xl font-bold bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 transition"
            >
              &times;
            </button>

            <Register
              closeModal={closeRegisterModal}
              openLoginModal={openLoginModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;





