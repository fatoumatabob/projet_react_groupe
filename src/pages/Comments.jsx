import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export default function Comments() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["comments", id], () =>
    api.get(`/articles/${id}/comments`).then(res => res.data)
  );

  if (isLoading) return <p>Chargement des commentaires...</p>;
  if (isError) return <p>Erreur lors du chargement des commentaires.</p>;

  return (
    <div>
      <h2>Commentaires</h2>
      {data.length === 0 ? (
        <p>Aucun commentaire pour cet article.</p>
      ) : (
        <ul>
          {data.map(comment => (
            <li key={comment.id}>
              <strong>{comment.user_name}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
