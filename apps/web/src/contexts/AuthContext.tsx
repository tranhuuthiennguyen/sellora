import { api } from "@/lib/api";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ERRORS, type UserEntity } from "@sellora/shared";
import { authApi } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

interface AuthContextType {
  user: UserEntity | null;
  accessToken: string | null;
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
}

// type AuthStatus = "unknown" | "authenticated" | "unauthenticated"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(null);

  /* -----------------------------
   * Boostrap auth (refresh + me)
   * ----------------------------- */
  const bootstrapQuery = useQuery({
    queryKey: ["auth", "bootstrap"],
    queryFn: async () => {
      const { accessToken } = await authApi.refresh();
      setToken(accessToken);

      const { user } = await authApi.me();
      return user;
    },
    retry: true,
    staleTime: Infinity,
  });

  /* ----------------------------------
   * Mutations
   * ---------------------------------- */
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: ({ accessToken, user }) => {
      setToken(accessToken);
      queryClient.setQueryData(["auth", "user"], user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.register(email, password),
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setToken(null);
      queryClient.clear();
    },
  });

  /* ----------------------------------
   * Axios interceptors
   * ---------------------------------- */
  useLayoutEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;

      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;

        if (
          error.response?.status === 401 &&
          error.response?.data.message === ERRORS.unauthorizedAccess.message
          // !original._retry &&
          // !original.url?.includes("/auth/refresh")
        ) {
          try {
            const { accessToken } = await authApi.refresh();
            setToken(accessToken);

            original._retry = true;
            original.headers.Authorization = `Bearer ${accessToken}`;

            return api(original);
          } catch {
            setToken(null);
            queryClient.clear();
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [token, queryClient]);

  /* ----------------------------------
   * Derived state
   * ---------------------------------- */
  const user = bootstrapQuery.data ?? null;

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      accessToken: token,
      isAuthenticated: !!token,
      isBootstrapping: bootstrapQuery.isLoading,
      register: async (email, password) => {
        try {
          await registerMutation.mutateAsync({ email, password });
          return { success: true };
        } catch (error: any) {
          return {
            success: false,
            message: error.response?.data?.message,
          };
        }
      },
      login: async (email, password) => {
        try {
          await loginMutation.mutateAsync({ email, password });
          return { success: true };
        } catch (error: any) {
          return {
            success: false,
            message: error.response?.data?.message,
          };
        }
      },
      logout: async () => {
        try {
          await logoutMutation.mutateAsync();
          return { success: true };
        } catch (error: any) {
          return {
            success: false,
            message: error.response?.data?.message,
          };
        }
      },
    }),
    [user, token, bootstrapQuery.isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
