import { paginatedQueryRequestDtoSchema } from "@/core/api/paginated-query.request.dto";
import Type from "typebox";

export const findUsersRequestDtoSchema = Type.Intersect([
  paginatedQueryRequestDtoSchema,
  Type.Object({
    country: Type.Optional(
      Type.String({
        example: "Australia",
        description: "Country of residence",
        maxLength: 50,
        pattern: "/^[ A-Za-z]*$/",
      }),
    ),
    state: Type.Optional(
      Type.String({
        example: "Victoria",
        description: "State",
        maxLength: 50,
        pattern: "/^[ A-Za-z]*$/",
      }),
    ),
    city: Type.Optional(
      Type.String({
        example: "Melbourne",
        description: "City",
        maxLength: 50,
        pattern: "/^[ A-Za-z]*$/",
      }),
    ),
  }),
]);
