import { Routes, Route } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostPage from "./pages/PostPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <h1>
          Jornal Proletário
        </h1>
        <span>O jornal para a maior classe</span>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
