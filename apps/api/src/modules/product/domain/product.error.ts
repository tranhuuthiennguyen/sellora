import { NotFoundException } from "@/core/exceptions";

export class ProductNotFoundError extends NotFoundException {
  static readonly message = "PRODUCT_NOT_FOUND";

  constructor() {
    super(ProductNotFoundError.message);
  }
}
