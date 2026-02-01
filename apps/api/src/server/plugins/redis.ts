import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import redisService from "@/core/cache/redis";

export default fp((fastify: FastifyInstance, _: unknown, done: () => void) => {
  redisService.connect();
  fastify.decorate("redis", redisService);

  fastify.addHook("onClose", async () => {
    await redisService.disconnect();
  });
  fastify.log.info("Cookie registered.");
  done();
});
