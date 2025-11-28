import fp from "fastify-plugin";
import { fastifyJwt } from "@fastify/jwt";
import { readFileSync } from "fs";
import path from "path";
import { FastifyInstance } from "fastify";

export default fp((fastify: FastifyInstance, _: unknown, done: () => void) => {
  try {
    fastify.register(fastifyJwt, {
      secret: {
        private: readFileSync(
          `${path.join(__dirname, "../", "certs")}/private.key`,
        ),
        public: readFileSync(
          `${path.join(__dirname, "../", "certs")}/public.key`,
        ),
      },
      cookie: {
        cookieName: "refreshToken",
        signed: false,
      },
      sign: {
        algorithm: "RS256",
      },
    });
    done();
  } catch (error: any) {
    throw new Error(error.message);
  }

  fastify.log.info("JWT registered");
});
