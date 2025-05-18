import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import { mockMovie } from "../constants/mock";
import { vi } from "vitest";
import type { Movie } from "../types";

vi.mock("./ui/Card", () => ({
  default: ({ movie }: { movie: Movie }) => (
    <div data-testid="card">{movie.title}</div>
  ),
}));

describe("Carousel", () => {
  const movies = [
    { ...mockMovie, id: 1, title: "Movie One" },
    { ...mockMovie, id: 2, title: "Movie Two" },
    { ...mockMovie, id: 3, title: "Movie Three" },
  ];

  it("renders all movie cards", () => {
    render(<Carousel movies={movies} />);
    expect(screen.getAllByTestId("card")).toHaveLength(movies.length);
    movies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("has scroll buttons", () => {
    render(<Carousel movies={movies} />);
    expect(screen.getByLabelText("Scroll left")).toBeInTheDocument();
    expect(screen.getByLabelText("Scroll right")).toBeInTheDocument();
  });

  it("calls scrollBy when scroll buttons are clicked", () => {
    render(<Carousel movies={movies} />);

    const scrollable = screen.getByTestId("scrollable");

    const scrollByMock = vi.fn();

    (scrollable as HTMLElement).scrollBy = scrollByMock;

    fireEvent.click(screen.getByLabelText("Scroll right"));
    expect(scrollByMock).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });

    fireEvent.click(screen.getByLabelText("Scroll left"));
    expect(scrollByMock).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });
});
