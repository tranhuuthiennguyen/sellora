import { CacheServicePort } from "@/core/cache/cache-service.port";
import { ICommandBus, IEventBus } from "@/core/cqrs/bus.types";
import PostgresDB from "@/core/db/postgres";
import { asValue } from "awilix";
import { FastifyBaseLogger } from "fastify";
import postgres from "postgres";

declare global {
  export interface Dependencies {
    logger: FastifyBaseLogger;
    db: ReturnType<typeof postgres>;
    queryBus: ICommandBus;
    commandBus: ICommandBus;
    eventBus: IEventBus;
    cacheService: CacheServicePort;
  }
}

// type SqlBaseProps = Omit<SqlRepositoryBaseProps<any, any>, 'logger' | 'db'>

export function makeDependencies({
  logger,
  queryBus,
  commandBus,
  eventBus,
  cacheService,
}: {
  logger: FastifyBaseLogger;
  queryBus: ICommandBus;
  commandBus: ICommandBus;
  eventBus: IEventBus;
  cacheService: CacheServicePort;
}) {
  return {
    logger: asValue(logger),
    db: asValue(PostgresDB),
    queryBus: asValue(queryBus),
    commandBus: asValue(commandBus),
    eventBus: asValue(eventBus),
    cacheService: asValue(cacheService),
  };
}
