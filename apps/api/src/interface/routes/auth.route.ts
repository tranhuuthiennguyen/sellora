import { LoginSchema } from "@/core/domain/auth/validate";
import { IRoute } from "@/core/interface/route.interface";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import AuthController from "../controllers/auth.controller";

class AuthRoute implements IRoute {
  public prefix_path = "/auth";

  async routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post("/login", { schema: LoginSchema }, AuthController.login);
  }
}

export default AuthRoute;
