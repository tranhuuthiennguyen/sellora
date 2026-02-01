import { ICommandBus } from "@/core/cqrs/bus.types";
import { productActionCreator } from "../..";
import { ProductRepositoryPort } from "../../database/product.repository.port";

export type DeleteProductCommandResult = Promise<any>;
export const deleteProductCommand = productActionCreator.actionCreator<{
  id: string;
}>("delete");

class DeleteProductHandler {
  private readonly _commandBus: ICommandBus;
  private readonly _productRepository: ProductRepositoryPort;

  constructor({ commandBus, productRepository }) {
    this._commandBus = commandBus;
    this._productRepository = productRepository;
  }

  async handler({ payload }: ReturnType<typeof deleteProductCommand>) {
    return await this._productRepository.delete(payload.id);
  }

  init() {
    this._commandBus.register(
      deleteProductCommand.type,
      this.handler.bind(this),
    );
  }
}

export default DeleteProductHandler;
