import { FastifyInstance } from "fastify";
import {
  changePasswordCommand,
  ChangePasswordCommandResult,
} from "./change-password.handler";
import {
  changePasswordRequestDto,
  changePasswordRequestDtoSchema,
} from "./change-password.schema";
import { apiResponseSchema } from "@/core/api/api.response";
import { getRequestId } from "@/core/app/app-request.context";
import { ForbiddenErrorException } from "@/core/exceptions";

export default async function changePassword(fastify: FastifyInstance) {
  fastify.route({
    method: "PATCH",
    url: "/v1/change-password",
    schema: {
      body: changePasswordRequestDtoSchema,
      response: {
        200: apiResponseSchema({}),
      },
    },
    onRequest: fastify.authenticate,
    preHandler: async (req, _, done) => {
      try {
        await fastify.diContainer.cradle.authorizationService.authorize(
          req.me.id,
          "user.update.own",
        );
      } catch (error: any) {
        done(error);
      }
    },
    handler: async (req, res) => {
      const body = req.body as changePasswordRequestDto;
      req.log.error(
        `User ${req.me.email} attemp to change password for User ${body.email}`,
      );
      if (req.me.email !== body.email) {
        throw new ForbiddenErrorException("Action denied");
      }
      await fastify.commandBus.execute<ChangePasswordCommandResult>(
        changePasswordCommand(body),
      );
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "Password Update Successfully",
        correlationId: getRequestId(),
      });
    },
  });
}
