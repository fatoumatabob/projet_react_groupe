// src/pages/ArticleForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/articles",
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/articles"); // retour à la liste après succès
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l’article.");
    }
  }

  return (
    <div className="container mt-4">
      <h2>📝 Créer un nouvel article</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
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
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Publier
        </button>
      </form>
    </div>
  );
}
