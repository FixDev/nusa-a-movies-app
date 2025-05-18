import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../services";
import { MovieCategory, type Movie } from "../types";
import { Button } from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const categories = [
  { key: MovieCategory.NowPlaying, label: "Now Playing" },
  { key: MovieCategory.Popular, label: "Popular" },
  { key: MovieCategory.TopRated, label: "Top Rated" },
  { key: MovieCategory.Upcoming, label: "Upcoming" },
];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<MovieCategory>("popular");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const loader = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (inputValue.trim() === "" && query) {
      setMovies([]);
      setSearchParams({});
    }
  }, [inputValue, query]);

  const fetchData = useCallback(
    async (reset = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);
      if (reset) setMovies([]);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetchMovies(category, reset ? 1 : page, query);

        if (data.results.length === 0) {
          setError("No movies found. Try a different search or category.");
        }

        setMovies((prev) =>
          reset ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
        setPage(reset ? 2 : page + 1);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [category, page, query, loading]
  );

  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [category, query]);

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          page <= totalPages &&
          !loading &&
          !error
        ) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [fetchData, loading, page, totalPages, error]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMovies([]);
    setError(null);
    const val = inputValue.trim();
    setSearchParams(val ? { query: val } : {});
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <form
        onSubmit={handleSearch}
        aria-label="search form"
        className="mb-6 max-w-sm flex items-center space-x-2"
      >
        <div className="flex-1">
          <Input value={inputValue} onChange={setInputValue} />
        </div>
        <Button type="submit">Find Movie</Button>
      </form>

      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            isSelected={category === cat.key}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {error && (
        <div className="text-center text-red-600 dark:text-red-400 my-8 font-semibold">
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 my-8 font-medium">
          No movies to display. Please select a category or search for a movie.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={loader} className="h-12 my-10 flex justify-center items-center">
        {loading && (
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
