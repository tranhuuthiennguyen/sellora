import { FastifyInstance } from "fastify";
import { loginUserRequestDtoSchema } from "./login-user.schema";
import { loginUserCommand, LoginUserCommandResult } from "./login-user.handler";
import { loginUserResponseDtoSchema } from "../../dtos/login.response.dto";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { getRequestId } from "@/core/app/app-request.context";

export default async function loginUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "POST",
    url: "/v1/login",
    schema: {
      description: "Login user with email and password",
      body: loginUserRequestDtoSchema,
      response: {
        200: loginUserResponseDtoSchema,
      },
    },
    handler: async (req, res) => {
      const { accessToken, refreshToken, user } =
        await fastify.commandBus.execute<LoginUserCommandResult>(
          loginUserCommand(req.body as any),
        );

      return res
        .setCookie("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30,
        })
        .status(200)
        .send({
          status: "success",
          statusCode: 200,
          message: "User logged in successfully",
          correlationId: getRequestId(),
          data: {
            accessToken,
            user: fastify.diContainer.cradle.userMapper.toResponse(user),
          },
        });
    },
  });
}
