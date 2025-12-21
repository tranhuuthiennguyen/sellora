import { api } from "@/api";
import type { UserEntity } from "@sellora/shared";

export const authApi = {
  refresh: async () => {
    const res = await api.get("/auth/refresh");
    return res.data as { accessToken: string };
  },

  me: async (token?: string) => {
    const res = await api.get("/auth/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return res.data as { user: UserEntity };
  },

  register: async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const res = await api.patch("/auth/password", { oldPassword, newPassword });
    return res.data;
  },
};
