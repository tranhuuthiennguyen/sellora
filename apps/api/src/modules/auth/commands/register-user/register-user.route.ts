import { idDtoSchema } from "@/core/api/id.response.dto";
import { FastifyInstance } from "fastify";

export default async function registerUser(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/v1/register",
    schema: {
      description: "Register user with email and password",
      body: {},
      response: {
        201: idDtoSchema,
      },
    },
    handler: async (req, res) => {},
  });
}
