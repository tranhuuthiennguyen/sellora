import { paginatedResponseBaseSchema } from "@/core/api/paginated.response.base";
import { userResponseDtoSchema } from "./user.response.dto";
import Type from "typebox";

export const userPaginatedResponseSchema = Type.Intersect([
  paginatedResponseBaseSchema,
  Type.Object({
    users: Type.Array(Type.Optional(userResponseDtoSchema)),
  }),
]);
