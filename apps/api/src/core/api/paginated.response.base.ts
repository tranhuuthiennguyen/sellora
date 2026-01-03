import { Type } from "typebox";

export const paginatedResponseBaseSchema = Type.Object({
  count: Type.Integer({ example: 5, description: "Total number of items" }),
  limit: Type.Integer({
    example: 10,
    description: "Number of items per page",
  }),
  page: Type.Integer({ example: 0, description: "Page number" }),
  data: Type.Array(Type.Any()),
});
