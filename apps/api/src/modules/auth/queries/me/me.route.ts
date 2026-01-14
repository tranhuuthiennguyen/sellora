import { apiResponseSchema } from "@/core/api/api.response";
import { getRequestId } from "@/core/app/app-request.context";
import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";

export default async function me(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/v1/me",
    schema: {
      response: {
        200: apiResponseSchema({
          me: Type.Any(),
        }),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (req, res) => {
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "AUTH_CURRENT_LOGIN_USER",
        correlationId: getRequestId(),
        data: {
          me: fastify.diContainer.cradle.userMapper.toResponse(req.me),
        },
      });
    },
  });
}
