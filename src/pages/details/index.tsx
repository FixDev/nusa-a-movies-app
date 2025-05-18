import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetail } from "../../services";
import type { MovieDetail } from "../../types";
import { getFullImageUrl } from "../../utils";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieDetail(+id)
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-500 dark:text-gray-400 font-medium">
        Loading...
      </p>
    );

  if (!movie)
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        Movie not found
      </p>
    );

  const director = movie.credits.crew.find(
    (member) => member.job === "Director"
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 dark:bg-gray-900 dark:md:bg-transparent bg-white rounded-xl shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center space-x-2 text-blue-600 dark:text-cyan-400 hover:text-blue-400 transition cursor-pointer"
      >
        <ArrowLeft />
        <span>Back</span>
      </button>

      <div className="relative mb-6 mx-auto w-full max-w-xs rounded-lg overflow-hidden shadow-md">
        <img
          src={getFullImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          loading="lazy"
          className="w-full object-cover aspect-[2/3]"
        />
        {movie.release_date && (
          <span className="absolute top-2 left-2 bg-blue-600 dark:bg-cyan-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {movie.release_date}
          </span>
        )}
      </div>

      <div className="space-y-4 text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-blue-600 dark:text-cyan-400">
          {movie.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {movie.overview || "No description available."}
        </p>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <span className="font-semibold text-gray-500 dark:text-gray-400">
              Director:
            </span>{" "}
            {director?.name || "Unknown"}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-cyan-400">
            Main Cast
          </h2>
          <ul className="list-disc list-inside space-y-1 max-h-52 overflow-y-auto">
            {movie.credits.cast.slice(0, 10).map((actor) => (
              <li key={actor.id} className="truncate">
                {actor.name} as{" "}
                <span className="italic">{actor.character}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
