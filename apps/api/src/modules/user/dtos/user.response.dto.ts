import { BaseResponseDtoSchema } from "@/core/api/response.base";
import { FromSchema } from "json-schema-to-ts";

export const UserResponseDtoSchema = {
  allOf: [BaseResponseDtoSchema, {}],
};

export type UserResponseDto = FromSchema<typeof UserResponseDtoSchema>;
