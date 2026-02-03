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

    // check if product exists in database
    if (!product || product.isDeleted) throw new ProductNotFoundError();
    const sellerId = product.sellerId;

    // disallow cross owner
    if (sellerId !== userId) {
      throw new ForbiddenErrorException();
    }

    // check not change
    if (!product.updateDetails(input)) {
      console.log("product details doesnt change");
      return product;
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
