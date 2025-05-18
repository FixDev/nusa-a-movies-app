import { render, screen, fireEvent } from "@testing-library/react";
import CategoryDropdown from "./CategorySelector";
import { MovieCategory } from "../types";
import { vi } from "vitest";

describe("CategoryDropdown", () => {
  const setCategory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with the current category label", () => {
    render(
      <CategoryDropdown
        category={MovieCategory.Popular}
        setCategory={setCategory}
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Popular");
  });

  it("opens and closes the dropdown on button click", () => {
    render(
      <CategoryDropdown
        category={MovieCategory.Popular}
        setCategory={setCategory}
      />
    );
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("displays grouped categories", () => {
    render(
      <CategoryDropdown
        category={MovieCategory.Popular}
        setCategory={setCategory}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Trending")).toBeInTheDocument();
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();

    expect(screen.getByText("Now Playing")).toBeInTheDocument();
    expect(screen.getByText("Top Rated")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("selects a category and closes the dropdown", () => {
    render(
      <CategoryDropdown
        category={MovieCategory.Popular}
        setCategory={setCategory}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    const target = screen.getByText("Upcoming");
    fireEvent.click(target);

    expect(setCategory).toHaveBeenCalledWith(MovieCategory.Upcoming);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    const setCategory = vi.fn();

    render(
      <div>
        <CategoryDropdown
          category={MovieCategory.Popular}
          setCategory={setCategory}
        />
        <button data-testid="outside">Outside</button>
      </div>
    );

    const dropdownButton = screen.getByRole("button", { name: /popular/i });
    fireEvent.click(dropdownButton);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
