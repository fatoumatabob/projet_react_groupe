import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// Inscription
export function useRegister() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
  });
}

// Vérification OTP
export function useVerifyOtp() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/verify-otp", payload);
      return data;
    },
  });
}

// Connexion
export function useLogin() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    },
  });
}

// Déconnexion
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
