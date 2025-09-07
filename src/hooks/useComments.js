import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// Récupérer les commentaires d’un article
export function useComments(articleId) {
  return useQuery({
    queryKey: ["comments", articleId],
    queryFn: async () => {
      const { data } = await api.get(`/articles/${articleId}/comments`);
      return data;
    },
  });
}

// Ajouter un commentaire
export function useAddComment(articleId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment) => {
      const { data } = await api.post(`/articles/${articleId}/comments`, comment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", articleId]);
    },
  });
}

// Supprimer un commentaire
export function useDeleteComment(articleId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId) => {
      await api.delete(`/articles/${articleId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", articleId]);
    },
  });
}
