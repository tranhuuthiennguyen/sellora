import { api } from "@/lib/api";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { type UserEntity } from "@sellora/shared";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

interface AuthContextType {
  user: UserEntity | null;
  accessToken: string | null;
  register: (
    email: string,
    password: string,
  ) => Promise<{ success?: boolean; message?: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success?: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const register = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/register", { email, password });
      console.log(res);
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      // useEffect(() => {})
      setToken(res.data.accessToken);
      setUser(res.data.user);

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      setToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/auth/refresh");
        const token = res.data.accessToken;
        setToken(token);

        const me = await api.get("/auth/me");
        setUser(me.data.user);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    init();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;

      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await api.get("/auth/refresh");
            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: token,
        register,
        login,
        logout,
        isAuthenticated,
        isBootstrapping,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
