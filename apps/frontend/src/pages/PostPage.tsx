import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, baseUrl } from "../api";
import { type Post } from "../types/post";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/posts/${id}?populate=cover`)
      .then((res) => setPost(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="container">
      <article className="card">
        {post.cover && (
          <img src={`${baseUrl}${post.cover.url}`} alt={post.cover.alternativeText} width={"100%"} />
        )}
        <h2>{post.title}</h2>
        <span>{post.description}</span>
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
