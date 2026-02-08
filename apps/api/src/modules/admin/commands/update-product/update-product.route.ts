import { FastifyInstance, FastifyRequest } from "fastify";

export default async function UpdateProduct(fastify: FastifyInstance) {
  fastify.route({
    method: "PATCH",
    url: "/v1/admin/update-products/:productId",
    schema: {},
    onRequest: fastify.authenticate,
    preHandler: (
      req: FastifyRequest<{
        Params: {
          productId: string;
        };
      }>,
      _,
      done,
    ) => {
      fastify.diContainer.cradle.authorizationService.authorize(
        req.me.id,
        "manage",
      );
      done();
    },
    handler: async (
      req: FastifyRequest<{
        Params: {
          productId: string;
        };
      }>,
      res,
    ) => {},
  });
}
