import { api } from "@/api";
import type { getUserResponseDto, updateUserRequestDto } from "./user.dto";

export const usersApi = {
  patch: async (userId: string, payload: updateUserRequestDto) => {
    const res = await api.patch<getUserResponseDto>(
      `/users/${userId}`,
      payload,
    );
    return res.data;
  },
};
