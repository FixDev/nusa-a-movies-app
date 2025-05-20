# 🎬 Nusa A Movies App by Muhammad Fikr (FixDev)

A minimal and modern movie web application built with **React**, **TypeScript**, and **Vite**. This project serves as a learning playground, demonstrating best practices, clean architecture, and a testable frontend stack.

> ⚠️ Features like code splitting, lazy loading, state management, and CI/CD pipeline are **intentionally not implemented yet** to allow room for technical discussions and future enhancements.

> 💬 Some parts of the code are commented to facilitate discussion around topics like rerender handling and best practices.

---

## 🧰 Tech Stack

- ⚛️ React 18
- ⛑️ TypeScript
- ⚡ Vite
- 🧪 Vitest + React Testing Library
- 🧹 ESLint + Husky (Git Hooks)

---

## 📁 Folder Structure

```
nusa-a-movies-app/
├── .husky/              # Git hooks (e.g., pre-commit)
├── public/              # Static assets (e.g., favicon)
├── src/
│   ├── services/        # API request abstraction
│   ├── components/      # Reusable UI components
│   ├── constants/       # Global constants
│   ├── hook/            # Custom React hooks
│   ├── pages/           # Top-level pages (e.g., Home, MovieDetail)
│   ├── types/           # Global TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component and routing
│   ├── index.css        # Global styles (includes Tailwind setup)
│   ├── main.tsx         # Application entry point
│   └── setupTests.ts    # Global test setup
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and scripts
└── README.md            # You're here!
```

> 🧠 This project avoids folders like `layouts/`, `features/`, `store/`, or `schemas/` to maintain simplicity. These can be added later as part of technical discussions.

---

## 🧪 Testing

All components are tested using **Vitest** and **React Testing Library**. Test files are located next to the components they test.

> 📌 The reason tests are colocated rather than in a separate folder can be a point of discussion for maintainability and scalability.

---

## 🚧 Planned Features (Discussion Topics)

The following features are planned for future iterations and discussion:

- 🔀 Code splitting (`React.lazy`, `Suspense`)
- 🧵 Global state management (e.g., Zustand, Redux, Context API)
- 🌐 SEO enhancements (meta tags, Open Graph, etc.)

---

## 🚀 Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev

# Run tests
yarn test

# Lint the code
yarn lint

# Build for production
yarn build
```

---

## 📦 ESLint Type-Aware Setup

To enable advanced TypeScript-aware linting:

```ts
// eslint.config.js
export default tseslint.config({
  extends: [...tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

> 💡 You may enhance this setup with `eslint-plugin-react-x` and `eslint-plugin-react-dom` for more React-specific lint rules.

---

## 📚 References

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Vitest Docs](https://vitest.dev/)

---

Made with ❤️ for learning and building together.
