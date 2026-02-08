import { Static } from "@sinclair/typebox";
import { ProductSchema } from "./products.schema";

export type ProductEntity = Static<typeof ProductSchema>;
