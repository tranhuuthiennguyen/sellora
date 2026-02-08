import { FastifyInstance } from "fastify";
import {
  createProductCommand,
  CreateProductCommandResult,
} from "./create-product.handler";
import {
  createProductRequestDto,
  createProductRequestDtoSchema,
} from "./create-product.schema";
import { createProductResponseDtoSchema } from "../../dtos/create.response.dto";
import { getRequestId } from "@/core/app/app-request.context";

export default async function createProduct(fastify: FastifyInstance) {
  fastify.route({
    method: "PUT",
    url: "/v1/products",
    schema: {
      body: createProductRequestDtoSchema,
      response: {
        200: createProductResponseDtoSchema,
      },
    },
    onRequest: fastify.authenticate,
    preHandler: async (req, _, done) => {
      try {
        await fastify.diContainer.cradle.authorizationService.authorize(
          req.me.id,
          "product.create",
        );
      } catch (error: any) {
        done(error);
      }
    },
    handler: async (req, res) => {
      const id =
        await fastify.diContainer.cradle.commandBus.execute<CreateProductCommandResult>(
          createProductCommand(req.body as createProductRequestDto),
        );
      return res.status(200).send({
        statusCode: 200,
        message: "New product created",
        correlationId: getRequestId(),
        data: {
          id,
        },
      });
    },
  });
}
