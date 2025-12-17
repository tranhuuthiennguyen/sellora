import { CreateUserSchema } from "@modules/users/users.schema";
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
  restoreSessionHandler,
} from "@modules/auth/auth.controller";
import { LoginSchema } from "@modules/auth/auth.schema";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { FastifyTypeBox } from "@/schemas/common.schema";

const authRouter: FastifyPluginAsyncTypebox = async (
  fastify: FastifyTypeBox,
) => {
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
  fastify.post("/logout", {
    schema: {},
    // onRequest: fastify.authenticateUser,
    handler: logoutHandler,
  });
  // REFRESH TOKEN
  fastify.get("/refresh", {
    schema: {},
    handler: refreshTokenHandler,
  });

  fastify.get("/me", {
    schema: {},
    onRequest: fastify.authenticateUser,
    handler: restoreSessionHandler,
  });
};

export default authRouter;
