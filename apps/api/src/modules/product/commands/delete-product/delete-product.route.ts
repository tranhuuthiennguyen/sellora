import { FastifyInstance, FastifyRequest } from "fastify";

import {
  deleteProductCommand,
  DeleteProductCommandResult,
} from "./delete-product.handler";
import { getRequestId } from "@/core/app/app-request.context";
import { apiResponseSchema } from "@/core/api/api.response";

export default async function deleteProduct(fastify: FastifyInstance) {
  fastify.route({
    method: "DELETE",
    url: "/v1/product/:productId",
    schema: {
      response: {
        200: apiResponseSchema({}),
      },
    },
    onRequest: fastify.authenticate,
    preHandler: async (
      req: FastifyRequest<{
        Params: {
          productId: string;
        };
      }>,
      _,
      done,
    ) => {
      try {
        await fastify.diContainer.cradle.authorizationService.authorize(
          req.me.id,
          "product.delete.own",
        );
      } catch (error: any) {
        done(error);
      }
    },
    handler: async (
      req: FastifyRequest<{
        Params: {
          productId: string;
        };
      }>,
      res,
    ) => {
      await fastify.diContainer.cradle.commandBus.execute<DeleteProductCommandResult>(
        deleteProductCommand({ id: req.params.productId, sellerId: req.me.id }),
      );
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "PRODUCT_DELETED",
        correlationId: getRequestId(),
      });
    },
  });
}
