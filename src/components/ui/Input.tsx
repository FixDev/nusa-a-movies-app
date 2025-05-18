interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search movies...",
}: SearchInputProps) {
  return (
    <input
      type="text"
      name="query"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] px-4 py-2
      text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-400 transition"
      autoComplete="off"
    />
  );
}
