import { api } from "@/api";

export const authApi = {
  refresh: async () => {
    const res = await api.get("/refresh-token");
    return res.data;
  },

  me: async (token?: string | null) => {
    const res = await api.get("/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return res.data;
  },

  register: async (email: string, password: string) => {
    const res = await api.post("/register", { email, password });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    return res.data;
  },

  logout: async () => {
    await api.post("/logout");
  },

  changePassword: async (
    email: string,
    oldPassword: string,
    newPassword: string,
  ) => {
    const res = await api.patch("/change-password", {
      email,
      oldPassword,
      newPassword,
    });
    return res.data;
  },
};
