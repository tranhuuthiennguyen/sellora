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
      const token = req.headers.authorization!.split(" ")[1];
      await fastify.diContainer.cradle.jwtTokenService.revokeToken(token);
      // logout from all devices
      // const pumpToken = user!.tokenVersion + 1;
      // await fastify.diContainer.cradle.db`
      //   UPDATE users
      //   SET token_version = ${pumpToken}
      //   WHERE email = ${user!.email}
      // `;
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
          message: "User logout successfully",
          correlationId: getRequestId(),
        });
    },
  });
}
