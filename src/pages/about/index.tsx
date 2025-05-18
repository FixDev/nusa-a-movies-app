export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white text-gray-800 dark:bg-gray-900 md:dark:bg-transparent md:dark:text-gray-800 transition-colors duration-300">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600 dark:text-cyan-400">
        About Nusa – A Movie App
      </h1>

      <p className="text-lg mb-6 leading-relaxed text-gray-800 dark:text-gray-300">
        <strong>Nusa</strong> is a modern movie browsing application powered by
        the{" "}
        <a
          href="https://www.themoviedb.org/"
          className="text-blue-600 underline hover:text-blue-500 dark:text-cyan-400 dark:hover:text-blue-300"
          target="_blank"
          rel="noreferrer"
        >
          TMDB API
        </a>
        . It allows users to search and explore a wide range of movies
        categorized into:
      </p>

      <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 mb-8 space-y-2 text-lg">
        <li>Now Playing</li>
        <li>Popular</li>
        <li>Top Rated</li>
        <li>Upcoming</li>
      </ul>

      <p className="text-lg mb-6 leading-relaxed text-gray-800 dark:text-gray-300">
        With a clean interface and responsive design built using{" "}
        <strong>React</strong>, <strong>Tailwind CSS</strong>, and{" "}
        <strong>TypeScript</strong>, Nusa offers a smooth experience across
        devices. Features include real-time search, infinite scroll, and
        detailed movie pages.
      </p>

      <p className="text-lg mb-10 leading-relaxed text-gray-800 dark:text-gray-300">
        This project is created for learning purposes and to demonstrate
        integration of modern frontend tools, API handling, routing, and testing
        best practices using <strong>React Testing Library</strong> and{" "}
        <strong>Jest</strong>.
      </p>
    </div>
  );
}
