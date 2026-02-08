import { api } from "@/api";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { getUserResponseDto } from "@/api/user/user.dto";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

type AuthContextType = {
  user: getUserResponseDto | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

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
  const [status, setStatus] = useState<AuthStatus>("loading");

  /* ----------------------------------
   * Mutations
   * ---------------------------------- */
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: ({ data }) => {
      setToken(data.accessToken);
      setStatus("authenticated");
      // queryClient.setQueryData(["user"], data.user);
    },
    onError: () => {
      setStatus("unauthenticated");
    },
  });

  // const registerMutation = useMutation({
  //   mutationFn: ({ email, password }: { email: string; password: string }) =>
  //     authApi.register(email, password),
  // });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setToken(null);
      setStatus("unauthenticated");
      queryClient.clear();
    },
  });

  /* ----------------------------------
   * Refresh on app mount
   * ---------------------------------- */
  useEffect(() => {
    let cancelled = false;

    async function bootstrapAuth() {
      try {
        setStatus("loading");
        const { data } = await authApi.refresh();
        if (!cancelled) {
          setToken(data.accessToken);
          setStatus("authenticated");
        }
      } catch {
        if (!cancelled) {
          setToken(null);
          setStatus("unauthenticated");
        }
      }
    }

    bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, []);

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
          error.response?.data.message === "Unauthorized"
          // original._retry
        ) {
          try {
            setStatus("loading");

            const { data } = await authApi.refresh();
            setToken(data.accessToken);
            setStatus("authenticated");

            original._retry = true;
            original.headers.Authorization = `Bearer ${data.accessToken}`;

            return api(original);
          } catch {
            setToken(null);
            setStatus("unauthenticated");
            queryClient.clear();
          }
        } else if (
          error.response?.status === 401 &&
          error.response?.data.message === "AUTH_REFRESH_NOT_FOUND" &&
          error.response?.data.error === "INVALID_CREDENTIALS"
        ) {
          console.log("AUTH_REFRESH_TOKEN_INVALID");
          setToken(null);
          setStatus("unauthenticated");
          queryClient.clear();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [token]);

  /* ----------------------------------
   * Derived state
   * ---------------------------------- */
  const isLoading = status === "loading";

  return (
    <AuthContext.Provider
      value={{
        user: null,
        accessToken: token,
        isAuthenticated: !!token,
        isLoading,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
