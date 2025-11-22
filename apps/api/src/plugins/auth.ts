import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import type { UserEntity } from "@sellora/shared";
import { ERRORS, handleServerError } from "@helpers/errors.helper";
import { getUserById } from "@modules/users/users.service";

declare module "fastify" {
  interface FastifyInstance {
    authenticateUser?: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

declare module "fastify" {
  interface FastifyRequest {
    currentUser: UserEntity | null | undefined | any;
  }
}

export default fp((fastify: FastifyInstance, _: unknown, done: () => void) => {
  const authPrehandler = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const user = request.session.get("authUser");

      if (!user) {
        request.log.warn("Unauthorized: no user session found");
        return reply.code(401).send({
          success: false,
          message: ERRORS.unauthorizedAccess.message,
        });
      }

      const userData = await getUserById(fastify.db, user.id);

      if (!userData) {
        request.log.warn("Unauthorized: user not found");
        request.session.delete();
        return reply.code(401).send({
          success: false,
          message: ERRORS.unauthorizedAccess.message,
        });
      }

      request.currentUser = userData;
    } catch (error) {
      return handleServerError(reply, error);
    }
  };
  fastify.decorate("authenticateUser", authPrehandler);
  done();
});
