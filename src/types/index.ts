export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: { id: number; name: string; job: string }[];
  };
};

export const MovieCategory = {
  NowPlaying: "now_playing",
  Popular: "popular",
  TopRated: "top_rated",
  Upcoming: "upcoming",
} as const;

export type MovieCategory = (typeof MovieCategory)[keyof typeof MovieCategory];
