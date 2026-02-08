import { FastifyInstance } from "fastify";
import {
  registerUserCommand,
  RegisterUserCommandResult,
} from "./register-user.handler";
import {
  registerUserRequestDto,
  registerUserRequestDtoSchema,
} from "./register-user.schema";
import { registerUserResponseDtoSchema } from "../../dtos/register.response.dto";
import { getRequestId } from "@/core/app/app-request.context";

export default async function registerUser(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/v1/register",
    schema: {
      description: "Register user with email and password",
      body: registerUserRequestDtoSchema,
      response: {
        201: registerUserResponseDtoSchema,
      },
    },
    handler: async (req, res) => {
      const id = await fastify.commandBus.execute<RegisterUserCommandResult>(
        registerUserCommand(req.body as registerUserRequestDto),
      );
      return res.status(201).send({
        statusCode: 201,
        message: "User registered successfully",
        correlationId: getRequestId(),
        data: {
          id,
        },
      });
    },
  });
}
