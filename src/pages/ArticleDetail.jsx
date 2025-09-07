// src/pages/ArticleDetail.jsx
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

async function fetchArticle(id) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return res.data;
}

export default function ArticleDetail() {
  const { id } = useParams();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id)
  });

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="container mt-4">
      <Link to="/articles" className="btn btn-outline-secondary mb-3">
        ← Retour aux articles
      </Link>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{article.title}</h2>
          <p className="text-muted">
            ✍️ {article.user?.username ?? "Inconnu"} •{" "}
            📅 {new Date(article.created_at).toLocaleDateString()}
          </p>
          <hr />
          <p className="card-text" style={{ whiteSpace: "pre-line" }}>
            {article.body}
          </p>
        </div>
      </div>
    </div>
  );
}
