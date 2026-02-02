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
    handler: async (
      req: FastifyRequest<{
        Params: {
          userId: string;
        };
      }>,
      res,
    ) => {
      const { userId } = req.params;

      const user =
        await fastify.diContainer.cradle.commandBus.execute<UpdateUserCommandResult>(
          updateUserCommand({
            userId: userId,
            ...(req.body as updateUserRequestDto),
          }),
        );
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "USER_UPDATED_SUCCESSFULLY",
        correlationId: getRequestId(),
        data: {
          user: fastify.diContainer.cradle.userMapper.toResponse(user),
        },
      });
    },
  });
}
