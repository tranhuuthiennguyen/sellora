import { FastifyInstance } from "fastify";
import { findUsersRequestDtoSchema } from "./find-users.schema";
import { userPaginatedResponseSchema } from "../../dtos/user.paginated.response.dto";
import { findUsersQuery, FindUsersQueryResult } from "./find-users.handler";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export default async function findUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/v1/users",
    schema: {
      description: "Find user by email",
      query: findUsersRequestDtoSchema,
      response: {
        200: userPaginatedResponseSchema,
      },
    },
    handler: async (req, res) => {
      const result = await fastify.queryBus.execute<FindUsersQueryResult>(
        findUsersQuery(req.query as any),
      );

      const response = {
        ...result,
        users: result.data?.map(
          fastify.diContainer.cradle.userMapper.toResponse,
        ),
      };

      return res.status(200).send(response);
    },
  });
}
