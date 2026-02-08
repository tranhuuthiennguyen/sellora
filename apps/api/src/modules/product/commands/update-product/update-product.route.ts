import { FastifyInstance, FastifyRequest } from "fastify";
import {
  updateProductCommand,
  UpdateProductCommandResult,
} from "./update-product.handler";
import {
  updateProductRequestDto,
  updateProductRequestDtoSchema,
} from "./update-product.schema";
import { apiResponseSchema } from "@/core/api/api.response";
import { getRequestId } from "@/core/app/app-request.context";
import { productResponseDtoSchema } from "../../dtos/product.response.dto";

export default async function updateProduct(fastify: FastifyInstance) {
  fastify.route({
    method: "PATCH",
    url: "/v1/products/:productId",
    schema: {
      body: updateProductRequestDtoSchema,
      response: {
        200: apiResponseSchema({
          product: productResponseDtoSchema,
        }),
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
          "product.update.own",
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
      const productId = req.params.productId;
      const body = req.body as updateProductRequestDto;
      const result =
        await fastify.diContainer.cradle.commandBus.execute<UpdateProductCommandResult>(
          updateProductCommand({ id: productId, userId: req.me.id, ...body }),
        );

      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "PRODUCT_UPDATED",
        correlationId: getRequestId(),
        data: {
          product: fastify.diContainer.cradle.productMapper.toResponse(result),
        },
      });
    },
  });
}
