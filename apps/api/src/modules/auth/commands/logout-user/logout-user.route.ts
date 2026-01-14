import { apiResponseSchema } from "@/core/api/api.response";
import { getRequestId } from "@/core/app/app-request.context";
import { FastifyInstance } from "fastify";

export default async function logoutUser(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/v1/logout",
    schema: {
      response: {
        200: apiResponseSchema({}),
      },
    },
    onRequest: fastify.authenticate,
    handler: async (req, res) => {
      const user = req.me;
      const pumpToken = user!.tokenVersion + 1;
      await fastify.diContainer.cradle.db`
        UPDATE users
        SET token_version = ${pumpToken}
        WHERE email = ${user!.email}
      `;
      return res
        .clearCookie("refreshToken", {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
        .status(200)
        .send({
          status: "success",
          statusCode: 200,
          message: "USER_LOGOUT_SUCCESSFULLY",
          correlationId: getRequestId(),
        });
    },
  });
}
