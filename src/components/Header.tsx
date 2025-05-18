import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../hook";
import { links } from "../constants";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-[#111827]/80 border-b border-gray-300 dark:border-gray-700
          transition-colors duration-500"
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div
          className="text-2xl font-semibold text-blue-600 dark:text-cyan-400 hover:text-cyan-200 cursor-pointer"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          onClick={() => navigate(-1)}
        >
          Nusa - A Movie
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm md:text-base">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`font-medium transition ${
                  isActive
                    ? "text-blue-600 dark:text-cyan-400 "
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <button
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-cyan-400
                hover:bg-gray-300 dark:hover:bg-cyan-600
                transition duration-300 flex items-center justify-center"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-cyan-400 hover:bg-gray-200 dark:hover:bg-cyan-600 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111827] border-t border-gray-300 dark:border-gray-700">
          <nav className="flex flex-col space-y-3 px-6 py-4 text-sm">
            {links.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium transition ${
                    isActive
                      ? "text-blue-600 dark:text-cyan-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode((d) => !d)}
              className="mt-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-cyan-400
                hover:bg-gray-300 dark:hover:bg-cyan-600
                transition duration-300 flex items-center justify-center w-full"
            >
              {darkMode ? (
                <>
                  <Sun size={20} />
                  <span className="ml-2">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <span className="ml-2">Dark Mode</span>
                </>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
