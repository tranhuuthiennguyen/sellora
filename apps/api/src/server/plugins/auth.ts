import { ApiErrorResponse } from "@/core/api/api-error.response";
import { getRequestId } from "@/core/app/app-request.context";
import { UserEntity } from "@/modules/user/domain/user.entity";
import { UserNotFoundError } from "@/modules/user/domain/user.error";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate?: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}

declare module "fastify" {
  interface FastifyRequest {
    me: UserEntity;
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
        return reply.status(401).send({
          // TO-DO
          status: "failed",
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
          correlationId: getRequestId(),
        } satisfies ApiErrorResponse);
      }

      let payload: any;
      try {
        payload = await fastify.diContainer.cradle.jwtTokenService.verify(
          authHeader.split(" ")[1],
        );
      } catch (error) {
        fastify.log.error(error);
        return reply.code(401).send({
          // TO-DO
          status: "failed",
          statusCode: 401,
          message: "Unauthorized",
          error: "Unauthorized",
          correlationId: getRequestId(),
        } satisfies ApiErrorResponse);
      }

      const user =
        await fastify.diContainer.cradle.userRepository.findOneByEmail(
          payload.sub,
        );
      if (!user) {
        throw new UserNotFoundError();
      }

      request.me = user;
    } catch (error: any) {
      throw error;
    }
  };
  fastify.decorate("authenticate", authOnRequest);
  fastify.log.info("Authentication plugin registered.");
  done();
});
