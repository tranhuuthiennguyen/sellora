import { ICommandBus } from "@/core/cqrs/bus.types";
import { productActionCreator } from "../..";
import { ProductRepositoryPort } from "../../database/product.repository.port";
import { ForbiddenErrorException } from "@/core/exceptions";
import { ProductNotFoundError } from "../../domain/product.error";

export type DeleteProductCommandResult = Promise<any>;
export const deleteProductCommand = productActionCreator.actionCreator<{
  id: string;
  sellerId: string;
}>("delete");

class DeleteProductHandler {
  private readonly _commandBus: ICommandBus;
  private readonly _productRepository: ProductRepositoryPort;

  constructor({ commandBus, productRepository }) {
    this._commandBus = commandBus;
    this._productRepository = productRepository;
  }

  async handler({ payload }: ReturnType<typeof deleteProductCommand>) {
    const product = await this._productRepository.findOneById(payload.id);
    if (!product || product.isDeleted) {
      throw new ProductNotFoundError();
    }

    if (product.sellerId !== payload.sellerId) {
      throw new ForbiddenErrorException();
    }
    product.softDelete(payload.sellerId);
    return await this._productRepository.softDeleteOne(product);
  }

  init() {
    this._commandBus.register(
      deleteProductCommand.type,
      this.handler.bind(this),
    );
  }
}

export default DeleteProductHandler;
