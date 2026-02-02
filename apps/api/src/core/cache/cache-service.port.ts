export interface CacheServicePort {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  get: <T = any>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown, ttlSeconds?: number) => Promise<void>;
  del: (key: string) => Promise<void>;
}
