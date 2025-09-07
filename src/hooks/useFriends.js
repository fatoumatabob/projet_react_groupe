import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export default function useFriends() {
  return useQuery({
    queryKey: ["friends"],             // clé unique
    queryFn: async () => {
      const res = await api.get("/friends");
      return res.data;
    },
  });
}

// --- Dans Friends.jsx ---
import useFriends from "../hooks/useFriends";

export default function Friends() {
  const { data: friends, isLoading, error } = useFriends();

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2>Liste des amis</h2>
      {friends.map(f => (
        <p key={f.id}>{f.name}</p>
      ))}
    </div>
  );
}
