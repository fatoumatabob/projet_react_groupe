import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchFeed() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://127.0.0.1:8000/api/feed", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export default function Dashboard() {
  const { data: feed, isLoading, error } = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed
  });

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2>Fil d’actualité</h2>
      <div className="row">
        {feed.map(article => (
          <div key={article.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text flex-grow-1">
                  {article.body?.substring(0, 100) ?? "Pas de contenu"}…
                </p>
                <p className="text-muted">Par {article.user?.username ?? "Inconnu"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
