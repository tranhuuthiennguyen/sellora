import { FastifyInstance } from "fastify";
import redisPlugin from "@/core/cache";
import fp from "fastify-plugin";

async function cachePlugin(fastify: FastifyInstance) {
  await fastify.register(redisPlugin);
}

export default fp(cachePlugin, {
  name: "CachePlugin",
});
