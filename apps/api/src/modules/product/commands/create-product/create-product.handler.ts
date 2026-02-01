import { ICommandBus } from "@/core/cqrs/bus.types";
import { productActionCreator } from "../..";
import { createProductRequestDto } from "./create-product.schema";
import { ProductEntity } from "../../domain/product.entity";
import { ProductRepositoryPort } from "../../database/product.repository.port";

export type CreateProductCommandResult = Promise<string>;
export const createProductCommand =
  productActionCreator.actionCreator<createProductRequestDto>("create");

class CreateProductHandler {
  private readonly commandBus: ICommandBus;
  private readonly productRepository: ProductRepositoryPort;

  constructor({ commandBus, productRepository }) {
    this.commandBus = commandBus;
    this.productRepository = productRepository;
  }

  async handler({ payload }: ReturnType<typeof createProductCommand>) {
    const { description, sellerId, title, priceCents, status } = payload;
    const product = ProductEntity.createNew({
      sellerId,
      title,
      description,
      priceCents,
      status,
    });
    await this.productRepository.insert(product);
    return product.id;
  }

  init() {
    this.commandBus.register(
      createProductCommand.type,
      this.handler.bind(this),
    );
  }
}

export default CreateProductHandler;
