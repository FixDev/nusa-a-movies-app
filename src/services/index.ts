import type { Movie, MovieCategory, MovieDetail } from "../types";
import client from "./client";

export async function fetchMovies(
  category: MovieCategory,
  page = 1,
  query = ""
): Promise<{ results: Movie[]; page: number; total_pages: number }> {
  const url = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `/movie/${category}?page=${page}`;
  const res = await client.get(url);
  return res.data;
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const url = `/movie/${id}?append_to_response=credits`;
  const res = await client.get(url);
  return res.data;
}
