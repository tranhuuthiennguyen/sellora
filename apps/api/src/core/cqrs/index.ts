import fastifyPlugin from "fastify-plugin";
import { ICommandBus, IEventBus } from "./bus.types";
import CommandBus from "./command-bus";
import EventBus from "./event-bus";
import { decorateWithMetadata, makeTrackExecutionTime } from "./middlewares";

const CQRSPlugin = fastifyPlugin(
  (fastify, _opts, done) => {
    if (fastify.queryBus || fastify.commandBus || fastify.eventBus) {
      throw new Error("This plugin is already registered");
    }
    const eventBusInstance = new EventBus();
    eventBusInstance.addMiddleware(decorateWithMetadata);

    const queryBusInstance = new CommandBus();
    queryBusInstance.addMiddleware(makeTrackExecutionTime(fastify.log));

    const commandBusInstance = new CommandBus();
    commandBusInstance.addMiddleware(makeTrackExecutionTime(fastify.log));

    fastify.decorate("eventBus", eventBusInstance);
    fastify.decorate("queryBus", queryBusInstance);
    fastify.decorate("commandBus", commandBusInstance);
    done();
  },
  {
    name: "fastify-cqrs",
    fastify: "5.x",
  },
);

declare module "fastify" {
  interface FastifyInstance {
    queryBus: ICommandBus;
    commandBus: ICommandBus;
    eventBus: IEventBus;
  }
}

export default CQRSPlugin;
