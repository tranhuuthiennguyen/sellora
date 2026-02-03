import { env } from "@/config";
import { createClient, RedisClientType } from "redis";
import { CacheServicePort } from "./cache-service.port";

class RedisService implements CacheServicePort {
  private client: RedisClientType | null = null;
  private url: string;

  constructor(url = env.redis.url || "redis://127.0.0.1:6379") {
    this.url = url;
  }

  async connect() {
    if (this.client) return;
    this.client = createClient({ url: this.url });
    this.client.on("error", (e) => console.error("Redis error", e));
    await this.client.connect();
  }

  async disconnect() {
    if (!this.client) return;
    await this.client.quit();
    this.client = null;
  }

  async get<T = any>(key: string): Promise<T | null> {
    if (!this.client) await this.connect();
    const v = await this.client?.get(key);
    return v ? (JSON.parse(v) as T) : null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number) {
    if (!this.client) await this.connect();
    const str = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client!.set(key, str, { EX: ttlSeconds });
    } else {
      await this.client!.set(key, str);
    }
  }

  async del(key: string) {
    if (!this.client) await this.connect();
    await this.client!.del(key);
  }

  async increment(key: string): Promise<number> {
    if (!this.client) await this.connect();
    return await this.client!.incr(key);
  }
}

export default RedisService;
