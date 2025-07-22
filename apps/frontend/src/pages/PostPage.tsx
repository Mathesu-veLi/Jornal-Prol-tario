import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import { type Post } from "../types/post";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="container">
      <article className="card">
        <h2>{post.title}</h2>
        <p>{post.text}</p>
        <br />
        <Link to="/" className="button">
          ← Voltar
        </Link>
      </article>
    </div>
  );
}

export default PostPage;
