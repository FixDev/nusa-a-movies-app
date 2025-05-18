import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages";
import Details from "./pages/details";
import About from "./pages/about";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="px-4 py-8 mx-auto min-h-screen bg-white dark:bg-[#121212] transition-colors duration-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
