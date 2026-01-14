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
import { InvalidCredentialsError } from "@/core/exceptions";

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
    handler: async (req, res) => {
      const body = req.body as changePasswordRequestDto;
      if (req.me.email !== body.email) {
        throw new InvalidCredentialsError("INVALID_EMAIL_ADDRESS");
      }
      await fastify.commandBus.execute<ChangePasswordCommandResult>(
        changePasswordCommand(body),
      );
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "PASSWORD_UPDATED_SUCCESSFULLY",
        correlationId: getRequestId(),
      });
    },
  });
}
