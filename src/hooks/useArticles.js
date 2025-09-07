import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export default function useArticles() {
  return useQuery({
    queryKey: ["articles"],           // clé unique
    queryFn: async () => {
      const res = await api.get("/articles");
      return res.data;
    },
  });
}
