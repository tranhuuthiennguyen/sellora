import { Static } from "@sinclair/typebox";
import { LoginInputSchema } from "./auth.schema.js";

export type LoginInputDto = Static<typeof LoginInputSchema>;
