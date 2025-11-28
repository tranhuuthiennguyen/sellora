import fastifyCookie from "@fastify/cookie";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { readFileSync } from "fs";
import path from "path";

export default fp((fastify: FastifyInstance, _: unknown, done: () => void) => {
  try {
    fastify.register(fastifyCookie, {
      secret: readFileSync(
        `${path.join(__dirname, "../", "certs")}/secret.key`,
      ),
      hook: "onRequest",
    });
    done();
  } catch (error: any) {
    throw new Error(error.message);
  }
  fastify.log.info("Cookie registered.");
});
