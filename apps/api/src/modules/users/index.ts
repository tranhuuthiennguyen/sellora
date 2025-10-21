import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { usersRoutes } from "./users.route";

const usersModule: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.register(usersRoutes, { prefix: "/users" });
};

export default usersModule;
