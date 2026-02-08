import { Action, CommandHandler, ICommandBus, Middleware } from "./bus.types";
import { pipe } from "ramda";

class CommandBus implements ICommandBus {
  private handlers: Map<string, CommandHandler>;
  private middlewares: Middleware[];

  constructor() {
    this.handlers = new Map<string, CommandHandler>();
    this.middlewares = [];
  }

  register<T extends string = string>(type: T, handler: CommandHandler): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }

    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }

    this.handlers.set(type, handler);
  }

  unregister<T extends string = string>(type: T): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    this.handlers.delete(type);
  }

  execute<R>(command: Action<unknown>): Promise<R> {
    if (!command || typeof command !== "object") {
      throw new TypeError("command must be an object");
    }
    if (typeof command.type !== "string") {
      throw new TypeError("command.type must be a string");
    }
    const handler = this.handlers.get(command.type);
    if (!handler) {
      throw new Error(`Command type of ${command.type} is not registered`);
    }
    if (this.middlewares.length > 0) {
      const list = (pipe as any)(...this.middlewares);
      return list(command, handler);
    } else {
      return handler(command);
    }
  }

  addMiddleware(fn: Middleware): void {
    this.middlewares.push(fn);
  }
}

export default CommandBus;
