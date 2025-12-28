import { CommandBus, EventBus } from "@/core/cqrs/bus.types";
import PostgresDB from "@/core/db/postgres";
import { asValue } from "awilix";
import { FastifyBaseLogger } from "fastify";
import postgres from "postgres";

declare global {
  export interface Dependencies {
    logger: FastifyBaseLogger;
    db: ReturnType<typeof postgres>;
    queryBus: CommandBus;
    commandBus: CommandBus;
    eventBus: EventBus;
  }
}

// type SqlBaseProps = Omit<SqlRepositoryBaseProps<any, any>, 'logger' | 'db'>

export function makeDependencies({
  logger,
  // queryBus,
  // commandBus,
  // eventBus
}: {
  logger: FastifyBaseLogger;
  // queryBus: CommandBus
  // commandBus: CommandBus
  // eventBus: EventBus
}) {
  return {
    logger: asValue(logger),
    db: asValue(PostgresDB),
    // repositoryBase: SqlRepositoryBase,
    // queryBus: asValue(queryBus),
    // commandBus: asValue(commandBus),
    // eventBus: asValue(eventBus)
  };
}
