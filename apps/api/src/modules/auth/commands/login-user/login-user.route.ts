import { FastifyInstance } from "fastify";
import { loginUserRequestDtoSchema } from "./login-user.schema";
import { loginUserCommand, LoginUserCommandResult } from "./login-user.handler";
import { loginUserResponseDtoSchema } from "../../dtos/login.response.dto";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export default async function loginUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "POST",
    url: "/v1/login",
    schema: {
      description: "Login user with email and password",
      body: loginUserRequestDtoSchema,
      response: {
        201: loginUserResponseDtoSchema,
      },
    },
    handler: async (req, res) => {
      const { accessToken, user } =
        await fastify.commandBus.execute<LoginUserCommandResult>(
          loginUserCommand(req.body as any),
        );

      return res.status(201).send({
        accessToken,
        user: fastify.diContainer.cradle.userMapper.toResponse(user),
      });
    },
  });
}
