import { Action, CommandCreator, Meta } from "./bus.types";

export class ActionCreatorFactory {
  private base: string | null;

  constructor(prefix: string) {
    this.base = prefix ? `${prefix}/` : "";
  }

  public actionCreator<Payload>(type: string, commonMeta?: Meta) {
    const fullType = this.base + type;

    return Object.assign(
      (payload: Payload, meta?: Meta) => {
        const action: Action<Payload> = {
          type: fullType,
          payload,
        };

        if (commonMeta || meta) {
          action.meta = Object.assign({}, commonMeta, meta);
        }

        return action;
      },
      {
        type: fullType,
      },
    ) as CommandCreator<Payload>;
  }
}
