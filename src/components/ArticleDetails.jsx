// src/components/ArticleDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ArticleDetails() {
  const { id } = useParams();

  // Fetch article depuis l’API backend
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/articles/${id}`);
      if (!res.ok) throw new Error("Erreur lors du chargement de l’article");
      return res.json();
    },
  });

  if (isLoading) return <p>Chargement de l’article...</p>;
  if (error) return <p className="text-danger">{error.message}</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{article.title}</h2>
          <p className="text-muted">
            ✍️ Par {article.user?.full_name || "Auteur inconnu"} •{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
          <hr />
          <p className="card-text">{article.body}</p>
        </div>
      </div>

      {/* Section commentaires */}
      {article.comments && (
        <div className="mt-4">
          <h4>💬 Commentaires</h4>
          {article.comments.length > 0 ? (
            article.comments.map((c) => (
              <div key={c.id} className="border rounded p-2 mb-2">
                <strong>{c.user?.full_name || "Anonyme"} :</strong>{" "}
                <span>{c.body}</span>
              </div>
            ))
          ) : (
            <p>Aucun commentaire pour l’instant.</p>
          )}
        </div>
      )}
    </div>
  );
}
