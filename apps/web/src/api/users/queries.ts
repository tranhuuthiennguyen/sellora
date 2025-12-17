import { usersApi } from ".";

export const usersQueryKeys = {
  update: ["users", "update"],
};

export const patchUserQuery = async () => ({
  queryKey: usersQueryKeys.update,
  queryFn: usersApi.patch,
});
