import { authApi } from ".";

export const authQueryKeys = {
  bootstrap: ["auth", "bootstrap"] as const,
};

export const bootstrapAuthQuery = () => ({
  queryKey: authQueryKeys.bootstrap,
  queryFn: async () => {
    const refresh = await authApi.refresh();
    const me = await authApi.me(refresh.accessToken);

    return {
      token: refresh.accessToken,
      user: me.user,
    };
  },
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  staleTime: Infinity,
  gcTime: Infinity,
});
