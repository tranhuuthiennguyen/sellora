import { Action, EventHandler, IEventBus, Middleware } from "./bus.types";
import { pipe } from "ramda";

class EventBus implements IEventBus {
  private handlers: Map<string, EventHandler>;
  private middlewares: Middleware[];

  constructor() {
    this.handlers = new Map<string, EventHandler>();
    this.middlewares = [];
  }

  on<T extends string = string>(type: T, handler: EventHandler): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.handlers.set(type, handler);
  }

  emit(event: Action<any>): void {
    if (!event || typeof event !== "object") {
      throw new TypeError("event must be an object");
    }
    if (typeof event.type !== "string") {
      throw new TypeError("event.type must be a string");
    }
    const handler = this.handlers.get(event.type);
    if (!handler) {
      throw new Error(`Event type of ${event.type} is not registered`);
    }

    if (this.middlewares.length > 0) {
      const list = (pipe as any)(...this.middlewares);
      list(event, handler);
    } else {
      handler(event);
    }
  }

  addMiddleware(fn: Middleware): void {
    this.middlewares.push(fn);
  }
}

export default EventBus;
