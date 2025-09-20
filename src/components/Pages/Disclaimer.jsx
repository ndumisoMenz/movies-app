import React from "react";
import { useNavigate } from "react-router-dom";

const Disclaimer = ({ theme }) => {
  const navigate = useNavigate();

  
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800";
  const buttonClass = isDark
    ? "bg-yellow-400 text-black hover:bg-yellow-500"
    : "bg-yellow-400 text-black hover:bg-yellow-500";

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-black/80" : "bg-gray-100/80"}`}>
      <div className={`${bgClass} w-[90%] max-w-2xl rounded-xl shadow-lg p-6 relative`}>
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Disclaimer</h2>
        <p className="text-sm mb-3">
          Please read this disclaimer carefully before using the service operated by us.
        </p>
        <p className="text-sm mb-3">
          Corsflix.net is your go-to platform for streaming blockbuster movies and TV shows
          sourced exclusively from third-party providers. CorsFlix does not upload, host, own,
          or store any of the content available on the site. All videos are streamed directly
          from external servers and are provided by third-party sources.
        </p>
        <p className="text-sm mb-3">
          CorsFlix has no control over the quality, availability, copyright, legality, or
          accuracy of the third-party content streamed via our platform. We cannot be held
          responsible for any issues related to the streaming content on CorsFlix, whether
          authorized or unauthorized. Users are solely responsible for ensuring they have
          the legal right to access any content.
        </p>
        <p className="text-sm mb-6">
          The operators of CorsFlix.net make no warranties or representations regarding the
          site or any content provided through the platform. Use at your own discretion.
        </p>

        <button
          onClick={() => navigate("/")}
          className={`${buttonClass} px-4 py-2 rounded font-semibold transition`}
        >
          Agree
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
