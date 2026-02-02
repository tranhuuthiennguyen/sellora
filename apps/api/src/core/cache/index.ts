import { CacheServicePort } from "./cache-service.port";
import fastifyPlugin from "fastify-plugin";
import RedisService from "./redis";

declare module "fastify" {
  interface FastifyInstance {
    cacheService: CacheServicePort;
  }
}

const RedisPlugin = fastifyPlugin(
  (fastify, _opts, done) => {
    const cacheService = new RedisService();
    fastify.decorate("cacheService", cacheService);
    done();
  },
  {
    name: "redis-service",
    fastify: "5.x",
  },
);

export default RedisPlugin;
