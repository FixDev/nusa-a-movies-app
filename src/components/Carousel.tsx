import { useRef } from "react";
import { type Movie } from "../types";
import Card from "./ui/Card";

interface CarouselProps {
  movies: Movie[];
}

export default function Carousel({ movies }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/50 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black"
        aria-label="Scroll left"
      >
        ◀
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth"
        data-testid="scrollable"
      >
        <div className="flex gap-4 w-max px-10">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-60">
              <Card movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/50 rounded-full p-2 shadow hover:bg-white dark:hover:bg-black"
        aria-label="Scroll right"
      >
        ▶
      </button>
    </div>
  );
}
