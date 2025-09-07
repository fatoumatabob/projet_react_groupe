// src/pages/Articles.jsx
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

async function fetchArticles() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://127.0.0.1:8000/api/articles", {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return res.data;
}

export default function Articles() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles
  });

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📰 Articles</h2>
        {token && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/articles/new")}
          >
            ➕ Créer un article
          </button>
        )}
      </div>

      <div className="row">
        {articles.length === 0 ? (
          <p>Aucun article disponible.</p>
        ) : (
          articles.map(article => (
            <div key={article.id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text flex-grow-1">
                    {article.body?.substring(0, 120) ?? "Pas de contenu"}…
                  </p>
                  <p className="text-muted mb-1">
                    ✍️ {article.user?.username ?? "Inconnu"}
                  </p>
                  <p className="text-muted" style={{ fontSize: "0.9em" }}>
                    📅 {new Date(article.created_at).toLocaleDateString()}
                  </p>
                  <Link to={`/articles/${article.id}`} className="btn btn-sm btn-outline-primary mt-auto">
                    Lire l’article →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
            {localStorage.getItem("token") && (
      <Link to="/articles/new" className="btn btn-success mb-3">
        ➕ Créer un article
      </Link>
    )}
      </div>
    </div>
  );
}
