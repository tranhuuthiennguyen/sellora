import { api } from "@/lib/api";
import { type UpdateUserDto, type UserEntity } from "@sellora/shared";

export const usersApi = {
  patch: async (userId: number, payload: UpdateUserDto) => {
    const res = await api.patch<UserEntity>(`/users/${userId}`, { payload });
    return res.data;
  },
};
