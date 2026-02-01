import { ICommandBus } from "@/core/cqrs/bus.types";
import { productActionCreator } from "../..";
import { ProductRepositoryPort } from "../../database/product.repository.port";
import { updateProductRequestDto } from "./update-product.schema";
import { ProductNotFoundError } from "../../domain/product.error";
import { ForbiddenErrorException } from "@/core/exceptions";
import { ProductEntity } from "../../domain/product.entity";

export type UpdateProductCommandResult = Promise<ProductEntity>;
export const updateProductCommand = productActionCreator.actionCreator<
  { id: string; userId: string } & updateProductRequestDto
>("update");

class UpdateProductHandler {
  private readonly _productRepository: ProductRepositoryPort;
  private readonly _commandBus: ICommandBus;

  constructor({ productRepository, commandBus }) {
    this._productRepository = productRepository;
    this._commandBus = commandBus;
  }

  async handler({ payload }: ReturnType<typeof updateProductCommand>) {
    const { id, userId, ...input } = payload;
    const product = await this._productRepository.findOneById(id);
    if (!product) throw new ProductNotFoundError();

    const sellerId = product.sellerId;

    if (sellerId !== userId) {
      throw new ForbiddenErrorException();
    }

    product.updateDetails(input);

    if (input.status !== undefined && input.status === "published") {
      product.publish();
    }

    if (input.status !== undefined && input.status === "draft") {
      product.unpublish();
    }

    return await this._productRepository.updateOne(product);
  }

  init() {
    this._commandBus.register(
      updateProductCommand.type,
      this.handler.bind(this),
    );
  }
}

export default UpdateProductHandler;
