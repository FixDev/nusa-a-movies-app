import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "./Card";
import { mockMovie } from "../../constants/mock";
import SearchInput from "./Input";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has selected styles when isSelected is true", () => {
    render(<Button isSelected>Selected</Button>);
    const btn = screen.getByText("Selected");

    expect(btn).toHaveClass("bg-blue-600");
    expect(btn).toHaveClass("text-white");
  });

  it("has default type='button'", () => {
    render(<Button>Default Type</Button>);
    const btn = screen.getByText("Default Type");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("supports custom type='submit'", () => {
    render(<Button type="submit">Submit</Button>);
    const btn = screen.getByText("Submit");
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("merges custom className with default classes", () => {
    render(<Button className="custom-class">Styled</Button>);
    const btn = screen.getByText("Styled");
    expect(btn).toHaveClass("custom-class");
  });
});

vi.mock("../../utils", () => ({
  getFullImageUrl: (path: string) => `https://image.tmdb.org/t/p/w500${path}`,
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MovieCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders movie title and release year", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Example Movie")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("navigates when clicked", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });

  it("shows loading spinner before image loads", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("navigates when pressing Enter key", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const card = screen.getByRole("button");
    fireEvent.keyUp(card, { key: "Enter" });
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });

  it("hides loading spinner after image loads", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img") as HTMLImageElement;
    fireEvent.load(img);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("SearchInput", () => {
  it("renders with default placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Custom placeholder"
      />
    );
    expect(
      screen.getByPlaceholderText("Custom placeholder")
    ).toBeInTheDocument();
  });

  it("displays the value passed as prop", () => {
    render(<SearchInput value="star wars" onChange={() => {}} />);
    expect(screen.getByDisplayValue("star wars")).toBeInTheDocument();
  });

  it("calls onChange with the new value when typing", () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "batman" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("batman");
  });

  it("shows clear button when there is a value and clears on click", () => {
    const handleChange = vi.fn();
    render(<SearchInput value="test" onChange={handleChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("does not show clear button when input is empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });
});
