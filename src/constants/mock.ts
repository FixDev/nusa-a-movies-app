import type { Movie, MovieDetail } from "../types";

export const mockMovieDetail: MovieDetail = {
  id: 1,
  title: "Sample Movie",
  overview: "This is a sample movie overview.",
  release_date: "2023-01-01",
  poster_path: "/sample.jpg",
  credits: {
    cast: [
      {
        id: 101,
        name: "Actor One",
        character: "Hero",
        profile_path: "/actor1.jpg",
      },
      {
        id: 102,
        name: "Actor Two",
        character: "Villain",
        profile_path: "/actor2.jpg",
      },
    ],
    crew: [
      {
        id: 201,
        name: "Jane Doe",
        job: "Director",
      },
      {
        id: 202,
        name: "John Smith",
        job: "Producer",
      },
    ],
  },
};

export const mockMovie: Movie = {
  id: 123,
  title: "Example Movie",
  release_date: "2024-01-01",
  poster_path: "/example.jpg",
};
