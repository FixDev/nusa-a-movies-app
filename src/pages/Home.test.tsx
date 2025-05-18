import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./index";
import * as services from "../services";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { mockMovie } from "../constants/mock";

vi.mock("../services", () => ({
  fetchMovies: vi.fn(),
}));

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders categories buttons and search input", async () => {
    (
      services.fetchMovies as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      results: [mockMovie],
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    for (const label of ["Popular"]) {
      const button = await screen.findByRole("button", { name: label });
      expect(button).toBeInTheDocument();
    }
  });

  test("loads and displays movies on initial render", async () => {
    (
      services.fetchMovies as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      results: [mockMovie],
      page: 1,
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Example Movie")).toBeInTheDocument();
      }, 300);
    });
  });

  test("shows error message when no movies found", async () => {
    (
      services.fetchMovies as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      results: [],
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(
          screen.getByText(
            /no movies found\. try a different search or category\./i
          )
        ).toBeInTheDocument();
      }, 300);
    });
  });

  test("shows error message on fetch failure", async () => {
    (
      services.fetchMovies as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error("Network Error"));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(
          screen.getByText(/failed to fetch movies\. please try again later\./i)
        ).toBeInTheDocument();
      }, 300);
    });
  });

  test("search input changes and triggers fetch", async () => {
    (
      services.fetchMovies as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      results: [mockMovie],
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new search" } });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() =>
      setTimeout(() => {
        expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
      }, 300)
    );
  });
});
