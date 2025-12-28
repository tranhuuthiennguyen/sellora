import { FastifyInstance } from "fastify";
import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import { makeDependencies } from "@/modules";
import path from "path";
import { formatName } from "./util";
import { asClass, Lifetime } from "awilix";

export async function di(fastify: FastifyInstance) {
  diContainer
    .register({
      ...makeDependencies({
        logger: fastify.log,
        // queryBus: fastify.queryBus,
        // commandBus: fastify.commandBus,
        // eventBus: fastify.eventBus
      }),
    })
    .loadModules(
      [
        path.join(
          __dirname,
          "../../modules/**/*.{repository,mapper,service,domain,base}.{js,ts}",
        ),
      ],
      {
        formatName,
        resolverOptions: {
          register: asClass,
          lifetime: Lifetime.SINGLETON,
        },
      },
    );

  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    asyncInit: true,
  });
}
