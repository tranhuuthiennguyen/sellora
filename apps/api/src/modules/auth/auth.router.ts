import { FastifyInstance } from "fastify";
import { CreateUserSchema } from "../users/users.schema";
import { loginHandler, registerHandler } from "./auth.controller";
import { LoginSchema } from "./auth.schema";

const authRouter = async (fastify: FastifyInstance) => {
  // REGISTER
  fastify.post(
    "/register",
    {
      schema: CreateUserSchema,
    },
    registerHandler,
  );
  // LOGIN
  fastify.post(
    "/login",
    {
      schema: LoginSchema,
    },
    loginHandler,
  );
  // LOGOUT
};

export default authRouter;
