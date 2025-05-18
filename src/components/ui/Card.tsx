import { useNavigate } from "react-router-dom";
import { getFullImageUrl } from "../../utils";
import type { Movie } from "../../types";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className="block rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shadow-sm
        hover:shadow-lg transition bg-white dark:bg-[#111827] cursor-pointer"
    >
      <div className="w-full aspect-[2/3] relative overflow-hidden bg-gray-200 dark:bg-gray-800 flex justify-center items-center">
        {!imgLoaded && (
          <div
            role="status"
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          />
        )}
        <img
          src={getFullImageUrl(movie.poster_path)}
          alt={movie.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />

        {movie.release_date && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded shadow-sm">
            {movie.release_date.slice(0, 4)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-base sm:text-md md:text-lg text-gray-900 dark:text-gray-100 whitespace-normal sm:truncate">
          {movie.title}
        </h2>
      </div>
    </div>
  );
}
