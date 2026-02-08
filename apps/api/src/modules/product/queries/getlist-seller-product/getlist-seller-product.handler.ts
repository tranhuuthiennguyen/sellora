import { ICommandBus } from "@/core/cqrs/bus.types";
import { productActionCreator } from "../..";

export type GetListSellerProductResult = Promise<any>;
export const getListSellerProductQuery =
  productActionCreator.actionCreator("getlist-seller");

class GetListSellerProductHandler {
  private readonly _queryBus: ICommandBus;
  constructor({ queryBus }) {
    this._queryBus = queryBus;
  }

  async handler({ payload }: ReturnType<typeof getListSellerProductQuery>) {}

  init() {
    this._queryBus.register(
      getListSellerProductQuery.type,
      this.handler.bind(this),
    );
  }
}

export default GetListSellerProductHandler;
