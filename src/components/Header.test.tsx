import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";
import { vi } from "vitest";

// Mock hook useDarkMode
vi.mock("../hook", () => ({
  useDarkMode: () => ({
    darkMode: false,
    setDarkMode: vi.fn(),
  }),
}));

// Mock links
vi.mock("../constants", () => ({
  links: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ],
}));

describe("Header", () => {
  it("renders header with links and theme toggle", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Nusa - A Movie")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();

    expect(screen.getByLabelText(/toggle dark mode/i)).toBeInTheDocument();
  });
});
