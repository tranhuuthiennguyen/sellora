import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { handleServerError } from "@helpers/errors.helper";
import { getUserById } from "@modules/users/users.service";
import { UserEntity } from "@sellora/shared/user";
import { ERRORS } from "@sellora/shared/lib";

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

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number };
    user: {
      id: number;
      email: string;
      username: string;
    };
  }
}

export default fp((fastify: FastifyInstance, _: unknown, done: () => void) => {
  const authOnRequest = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return reply.code(401).send({
          success: false,
          message: ERRORS.unauthorizedAccess.message,
        });
      }

      let payload: any;

      try {
        payload = await request.jwtVerify();
      } catch (error) {
        return reply.code(401).send({
          success: false,
          message: ERRORS.unauthorizedAccess.message,
        });
      }

      const userData = await getUserById(fastify.db, payload.id);

      if (!userData) {
        return reply.code(404).send({
          success: false,
          message: ERRORS.userNotExists.message,
        });
      }

      request.currentUser = userData;
    } catch (error) {
      return handleServerError(reply, error);
    }
  };
  fastify.decorate("authenticateUser", authOnRequest);
  fastify.log.info("Authentication plugin registered.");
  done();
});
