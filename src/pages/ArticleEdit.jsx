// src/pages/ArticleEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setBody(res.data.body);
      } catch (err) {
        setError("Impossible de charger l’article.");
      }
    }
    fetchArticle();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/api/articles/${id}`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/articles/${id}`);
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
    }
  }

  return (
    <div className="container mt-4">
      <h2>✏️ Modifier l’article</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contenu</label>
          <textarea
            className="form-control"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">💾 Sauvegarder</button>
      </form>
    </div>
  );
}
