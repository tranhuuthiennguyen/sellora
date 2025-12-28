import { FastifyInstance } from "fastify";

export default async function findUser(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/v1/users",
    schema: {},
    handler: async (req, res) => {
      try {
        // awilix successfully resolve userRepository but not its construct params Mapper
        const userRepository = fastify.diContainer.cradle.userRepository;
        fastify.log.debug(await userRepository.findAll());
        return res.code(200).send("OK");
      } catch (error) {
        return res.code(500).send(error);
      }
    },
  });
}
