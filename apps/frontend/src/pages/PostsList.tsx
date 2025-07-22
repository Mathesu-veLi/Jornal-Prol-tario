import { useEffect, useState } from "react";
import { api } from "../api";
import { type Post } from "../types/post";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Últimas Notícias</h2>
      <div className="posts">
        {posts.map((post) => (
          <article key={post.documentId} className="post">
            <h3>
              <Link to={`/post/${post.documentId}`}>{post.title}</Link>
            </h3>
            <p>{post.text.substring(0, 120)}...</p>
            <br />
            <Link to={`/post/${post.documentId}`} className="button">
              Ler mais
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
