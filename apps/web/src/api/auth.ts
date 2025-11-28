import { api } from "@/lib/api";

export const refreshSession = async () => {
  const res = await api.get("/auth/refresh");
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const loginRequest = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};
