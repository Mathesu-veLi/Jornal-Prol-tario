import { Routes, Route } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostPage from "./pages/PostPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
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
