import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import {
  refreshTokenQuery,
  RefreshTokenQueryResult,
} from "./refresh-token.handler";
import {
  InvalidCredentialsErrorException,
  NotFoundException,
} from "@/core/exceptions";
import { refreshTokenResponseDtoSchema } from "../../dtos/refresh-token.response.dto";
import { getRequestId } from "@/core/app/app-request.context";
import { UserNotFoundError } from "@/modules/user/domain/user.error";

export default async function refreshToken(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/v1/refresh-token",
    schema: {
      response: {
        200: refreshTokenResponseDtoSchema,
      },
    },
    // onRequest: fastify.authenticate,
    handler: async (req, res) => {
      const refresh = req.cookies.refreshToken;
      if (!refresh)
        throw new InvalidCredentialsErrorException("Refresh token not found");

      try {
        const { accessToken, refreshToken } =
          await fastify.queryBus.execute<RefreshTokenQueryResult>(
            refreshTokenQuery(refresh),
          );

        return res
          .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7,
          })
          .status(200)
          .send({
            status: "success",
            statusCode: 200,
            message: "Auth tokens refreshed",
            correlationId: getRequestId(),
            data: {
              accessToken,
            },
          });
      } catch (error: any) {
        if (error instanceof NotFoundException) throw new UserNotFoundError();
      }
    },
  });
}
