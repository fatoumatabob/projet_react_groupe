import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Home.css";

async function fetchArticles() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://127.0.0.1:8000/api/articles", {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return res.data;
}

export default function Home() {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles-home"],
    queryFn: fetchArticles,
  });

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <h1 className="hero-title">
          Bienvenue sur <span>Mon Blog</span>
        </h1>
        <p className="hero-subtitle">
          Découvrez vos articles, ceux de vos amis et partagez vos idées.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary me-2">
            Inscription
          </Link>
          <Link to="/login" className="btn btn-outline-light">
            Connexion
          </Link>
        </div>
      </section>

      {/* Articles récents */}
      <section className="articles-section container">
        <h2 className="section-title">📰 Articles récents</h2>

        {isLoading && <p>Chargement des articles...</p>}
        {error && <p className="text-danger">Erreur : {error.message}</p>}

        <div className="row">
          {articles.length === 0 && !isLoading ? (
            <p>Aucun article disponible.</p>
          ) : (
            articles
              .slice(0, 3) // ⬅️ On prend seulement les 3 plus récents
              .map((article) => (
                <div key={article.id} className="col-md-4 mb-4">
                  <div className="card article-card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text flex-grow-1">
                        {article.body?.substring(0, 120) ?? "Pas de contenu"}…
                      </p>
                      <p className="text-muted small">
                        ✍️ {article.user?.username ?? "Inconnu"}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                        📅 {new Date(article.created_at).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/articles/${article.id}`}
                        className="btn btn-sm btn-outline-primary mt-auto"
                      >
                        Lire l’article →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="text-center mt-3">
          <Link to="/articles" className="btn btn-secondary">
            Voir tous les articles →
          </Link>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="cta-section text-center">
        <h3>🚀 Prêt à écrire ?</h3>
        <p>Créez un article en quelques clics et partagez vos idées avec le monde.</p>
        <Link to="/articles/new" className="btn btn-success">
          ✍️ Créer un article
        </Link>
      </section>
    </div>
  );
}
