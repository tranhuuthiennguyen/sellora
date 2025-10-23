import { FastifyInstance, FastifyPluginOptions } from "fastify";

const authRouter = async (fastify: FastifyInstance) => {
  fastify.get("/", async (request, reply) => {
    return { message: "hello  from /auth/" };
  });
};

export default authRouter;
