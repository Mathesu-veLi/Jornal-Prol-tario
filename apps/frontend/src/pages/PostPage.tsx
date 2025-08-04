import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, baseUrl } from "../api";
import { type Post } from "../types/post";

function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api
      .get(`/posts/${id}?populate=cover`)
      .then((res) => setPost(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setLoadingRecent(true);
    api
      .get("/posts?populate=cover&pagination[limit]=5&sort=publishedAt:desc")
      .then((res) =>
        setRecentPosts(res.data.data.filter((p: Post) => p.documentId !== id))
      )
      .finally(() => setLoadingRecent(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div className="container postpage-container">
      <article className="card main-post">
        {post.cover && (
          <img
            src={`${baseUrl}${post.cover.url}`}
            alt={post.cover.alternativeText}
            width={"100%"}
          />
        )}
        <h2>{post.title}</h2>
        <span>{post.description}</span>
        <p>{post.text}</p>
        <br />
        <Link to="/" className="button">
          ← Voltar
        </Link>
      </article>

      <aside className="recent-posts">
        <h3>Últimas Notícias</h3>
        {loadingRecent ? (
          <p>Carregando...</p>
        ) : recentPosts.length === 0 ? (
          <p>Nenhuma notícia encontrada.</p>
        ) : (
          recentPosts.map((rp) => (
            <Link
              key={rp.documentId}
              to={`/post/${rp.documentId}`}
              className="recent-post-link"
            >
              {rp.cover && (
                <img
                  src={`${baseUrl}${rp.cover.url}`}
                  alt={rp.cover.alternativeText}
                />
              )}
              <span>{rp.title}</span>
            </Link>
          ))
        )}
      </aside>
    </div>
  );
}

export default PostPage;
