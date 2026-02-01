import { FastifyInstance } from "fastify";

export default async function getListSellerProduct(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/v1/getlist-seller-product",
    schema: {},
    handler: async (req, res) => {
      // await fastify.diContainer.cradle.queryBus.execute()
    },
  });
}
