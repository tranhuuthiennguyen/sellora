import {
  ForbiddenErrorException,
  InvalidCredentialsErrorException,
} from "@/core/exceptions";
import { JwtPayload } from "@/modules/auth/services/jwt.token.service";
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
  const authOnRequest = async (request: FastifyRequest, _: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new InvalidCredentialsErrorException(
          "Missing or invalid authorization header",
        );
      }

      const token = authHeader.split(" ")[1];

      let payload: JwtPayload;
      try {
        payload =
          await fastify.diContainer.cradle.jwtTokenService.verify(token);
      } catch (error: any) {
        throw new InvalidCredentialsErrorException(
          error.message || "Invalid token",
        );
      }

      if (payload.isDeleted) {
        throw new InvalidCredentialsErrorException(
          "User acount has been deleted",
        );
      }

      if (!payload.isEnabled) {
        throw new ForbiddenErrorException("User account is disabled");
      }

      // try to get user from cache
      let user: UserEntity | null | undefined = null;
      if (fastify.diContainer.cradle.cacheService) {
        const cachedUser = await fastify.diContainer.cradle.cacheService.get(
          `user:${payload.userId}`,
        );

        user = cachedUser
          ? fastify.diContainer.cradle.userMapper.toDomain(cachedUser)
          : cachedUser;
        if (user)
          fastify.log.info(
            `[AUTH-MIDDLEWARE]: HIT cache get user [${JSON.stringify(user.id)}]`,
          );
      }

      // if not in cache, fetch from DB
      if (!user) {
        fastify.log.info(
          `[AUTH-MIDDLEWARE]: HIT cache get failed [${JSON.stringify(user)}]`,
        );
        user = await fastify.diContainer.cradle.userRepository.findOneByEmail(
          payload.email,
        );

        if (!user || user.isDeleted) {
          throw new UserNotFoundError();
        }
        // cache for 15 minutes
        await fastify.diContainer.cradle.cacheService.set(
          `user:${payload.userId}`,
          fastify.diContainer.cradle.userMapper.toPersistence(user),
          900,
        );
        fastify.log.info(`[AUTH-MIDDLEWARE]: HIT cache set [${user.id}]`);
      }
      if (!user.isEnabled || user.isDeleted) {
        await fastify.diContainer.cradle.cacheService.del(
          `user:${payload.userId}`,
        );
        throw new InvalidCredentialsErrorException(
          "User account is no longer active",
        );
      }

      request.me = user;
    } catch (error: any) {
      throw new InvalidCredentialsErrorException(error.message);
    }
  };
  fastify.decorate("authenticate", authOnRequest);
  fastify.log.info("Authentication plugin registered.");
  done();
});
