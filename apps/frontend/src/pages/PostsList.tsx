import { Link } from "react-router-dom";
import { api, baseUrl } from "../api";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts?populate=cover")
      .then((res) => setPosts(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  const lastPost = posts[posts.length - 1];
  const otherPosts = posts.slice(0, posts.length - 1);

  return (
    <div className="container">
      <img src="/favicon.ico" alt="Icon" />

      <h2>Últimas Notícias</h2>

      {lastPost && (
        <div className="post last-post">
          <Link to={`/post/${lastPost.documentId}`}>
            {lastPost.cover && (
              <div className="cover-wrapper">
                <img
                  src={`${baseUrl}${lastPost.cover.url}`}
                  alt={lastPost.cover.alternativeText || lastPost.title}
                  width="100%"
                />
                <h2 className="cover-title">{lastPost.title}</h2>
              </div>
            )}
            <span>{lastPost.description}</span>
            <br />
            <span className="button">Ler mais</span>
          </Link>
        </div>
      )}

      <div className="posts">
        {otherPosts.map((post) => (
          <article key={post.documentId} className="post">
            <Link to={`/post/${post.documentId}`}>
              {post.cover && (
                <img
                  src={`${baseUrl}${post.cover.url}`}
                  alt={post.cover.alternativeText || post.title}
                  width="100%"
                />
              )}
              <h3>{post.title}</h3>
              <span>{post.description}</span>
              <br />
              <span className="button">Ler mais</span>
            </Link>
          </article>
        ))}

        {/* Última notícia em destaque */}
      </div>
    </div>
  );
}
