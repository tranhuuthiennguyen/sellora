import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateUserSchema } from "../users/users.schema";
import { register } from "./auth.controller";

const authRouter = async (fastify: FastifyInstance) => {
  // REGISTER
  fastify.post(
    "/register",
    {
      schema: CreateUserSchema,
    },
    register,
  );
};

export default authRouter;
