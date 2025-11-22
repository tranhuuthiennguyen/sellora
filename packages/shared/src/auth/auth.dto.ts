import { Static } from "@sinclair/typebox";
import { LoginInputSchema } from "./auth.schema";

export type LoginInputDto = Static<typeof LoginInputSchema>;
