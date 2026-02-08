import { NotFoundException } from "@/core/exceptions";

export class ProductNotFoundError extends NotFoundException {
  static readonly message = "Product not found";

  constructor() {
    super(ProductNotFoundError.message);
  }
}
