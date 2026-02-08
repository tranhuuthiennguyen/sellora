import { FastifyInstance, FastifyRequest } from "fastify";
import {
  updateUserCommand,
  UpdateUserCommandResult,
} from "./update-user.handler";
import {
  updateUserRequestDto,
  updateUserRequestDtoSchema,
} from "./update-user.schema";
import { apiResponseSchema } from "@/core/api/api.response";
import { getRequestId } from "@/core/app/app-request.context";
import { userResponseDtoSchema } from "../../dtos/user.response.dto";
import { ForbiddenErrorException } from "@/core/exceptions";

export default async function updateUser(fastify: FastifyInstance) {
  fastify.route({
    method: "PATCH",
    url: "/v1/users/:userId",
    schema: {
      body: updateUserRequestDtoSchema,
      response: {
        200: apiResponseSchema({
          user: userResponseDtoSchema,
        }),
      },
    },
    onRequest: fastify.authenticate,
    preHandler: async (
      req: FastifyRequest<{
        Params: {
          userId: string;
        };
        Body: updateUserRequestDto;
      }>,
      _,
      done,
    ) => {
      await fastify.diContainer.cradle.authorizationService.authorize(
        req.me.id,
        "user.update.own",
      );
      done;
    },
    handler: async (
      req: FastifyRequest<{
        Params: {
          userId: string;
        };
        Body: updateUserRequestDto;
      }>,
      res,
    ) => {
      const { userId } = req.params;
      const body = req.body;

      if (userId !== req.me.id) {
        throw new ForbiddenErrorException("action denied");
      }

      const user =
        await fastify.diContainer.cradle.commandBus.execute<UpdateUserCommandResult>(
          updateUserCommand({
            userId: userId,
            profile: {
              displayName: body.displayName,
              bio: body.bio,
              profilePictureUrl: body.profilePictureUrl,
            },
            address: {
              country: body.country,
              state: body.state,
              city: body.city,
              zipCode: body.zipCode,
              streetAddress: body.streetAddress,
            },
            preferences: {
              currencyType: body.currencyType,
              timeZone: body.timeZone,
            },
          }),
        );

      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "user details updated successfully",
        correlationId: getRequestId(),
        data: {
          user: fastify.diContainer.cradle.userMapper.toResponse(user),
        },
      });
    },
  });
}
