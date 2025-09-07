import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useFeed(page = 1) {
  return useQuery({
    queryKey: ["feed", page],
    queryFn: async () => {
      const { data } = await api.get(`/feed?page=${page}`);
      return data; // attendu: { data: [...], meta: { current_page, last_page } } (paginator Laravel)
    },
    keepPreviousData: true,
  });
}
