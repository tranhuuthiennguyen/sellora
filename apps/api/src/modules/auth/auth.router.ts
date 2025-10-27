import { FastifyInstance } from "fastify";
import { CreateUserSchema } from "../users/users.schema";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "./auth.controller";
import { LoginSchema } from "./auth.schema";

const authRouter = async (fastify: FastifyInstance) => {
  // REGISTER
  fastify.post("/register", {
    schema: CreateUserSchema,
    handler: registerHandler,
  });
  // LOGIN
  fastify.post("/login", {
    schema: LoginSchema,
    handler: loginHandler,
  });
  // LOGOUT
  fastify.get("/logout", {
    schema: {},
    preHandler: fastify.authenticateUser,
    handler: logoutHandler,
  });
};

export default authRouter;
