export const getFullImageUrl = (path: string | null, size = "w300") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "https://placehold.co/300x450?text=No+Image";
