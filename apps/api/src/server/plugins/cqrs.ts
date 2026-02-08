import { FastifyInstance } from "fastify";
import fastifyCqrs from "@/core/cqrs";
import fp from "fastify-plugin";

async function cqrsPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyCqrs);
}

export default fp(cqrsPlugin, {
  name: "CQRSPlugin",
});
