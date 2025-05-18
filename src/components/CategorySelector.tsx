import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "../components/ui/Button";
import { MovieCategory } from "../types";

interface Category {
  key: MovieCategory;
  label: string;
  group: string;
}

interface CategoryDropdownProps {
  category: MovieCategory;
  setCategory: (cat: MovieCategory) => void;
}

const categories: Category[] = [
  { key: MovieCategory.NowPlaying, label: "Now Playing", group: "Current" },
  { key: MovieCategory.Popular, label: "Popular", group: "Trending" },
  { key: MovieCategory.TopRated, label: "Top Rated", group: "Trending" },
  { key: MovieCategory.Upcoming, label: "Upcoming", group: "Coming Soon" },
];

type GroupedCategories = Record<string, Category[]>;

// const groupCategories = useCallback(
//   (cats: Category[]): GroupedCategories =>
//     cats.reduce<GroupedCategories>((acc, cat) => {
//       if (!acc[cat.group]) acc[cat.group] = [];
//       acc[cat.group].push(cat);
//       return acc;
//     }, {}),
//   [] //
// );

export default function CategoryDropdown({
  category,
  setCategory,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const groupCategories = useCallback(
    (cats: Category[]): GroupedCategories =>
      cats.reduce<GroupedCategories>((acc, cat) => {
        if (!acc[cat.group]) acc[cat.group] = [];
        acc[cat.group].push(cat);
        return acc;
      }, {}),
    []
  );

  const grouped = groupCategories(categories);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full inline-block text-left" ref={dropdownRef}>
      <Button
        role="button"
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 dark:border-gray-700
    bg-white dark:bg-[#1f2937] px-4 text-sm font-medium text-gray-700 dark:text-gray-200
    hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-400
    sm:h-12"
      >
        {categories.find((c) => c.key === category)?.label || "Select Category"}
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      {open && (
        <div
          className="absolute mt-2 min-w-full max-w-xs rounded-md shadow-lg bg-white dark:bg-[#1f2937] ring-1 ring-black ring-opacity-5
          focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {Object.entries(grouped).map(([groupName, cats]) => (
            <div
              key={groupName}
              className="p-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {groupName}
              </h3>
              <div className="mt-1 flex flex-col space-y-1">
                {cats.map((cat) => (
                  <Button
                    key={cat.key}
                    onClick={() => {
                      setCategory(cat.key);
                      setOpen(false);
                    }}
                    isSelected={category === cat.key}
                    className="w-full text-left"
                    role="menuitem"
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
