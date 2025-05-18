import { render, screen, waitFor } from "@testing-library/react";
import Details from "./index";
import * as services from "../../services";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mockMovieDetail } from "../../constants/mock";
import { vi } from "vitest";

vi.mock("../../services", () => ({
  fetchMovieDetail: vi.fn(),
}));

describe("Details page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading initially", () => {
    (
      services.fetchMovieDetail as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders movie details after loading", async () => {
    (
      services.fetchMovieDetail as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockMovieDetail);

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: mockMovieDetail.title })
      ).toBeInTheDocument()
    );

    expect(screen.getByText(/director/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByText(mockMovieDetail.overview)).toBeInTheDocument();

    mockMovieDetail.credits.cast.slice(0, 10).forEach((actor) => {
      expect(screen.getByText(new RegExp(actor.name, "i"))).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(actor.character, "i"))
      ).toBeInTheDocument();
    });
  });

  test("renders error message when movie not found", async () => {
    (
      services.fetchMovieDetail as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={["/movie/999"]}>
        <Routes>
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/movie not found/i)).toBeInTheDocument()
    );
  });
});
