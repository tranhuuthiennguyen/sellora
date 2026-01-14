import { apiResponseSchema } from "@/core/api/api.response";
import Type from "typebox";

export const refreshTokenResponseDtoSchema = apiResponseSchema({
  accessToken: Type.String(),
});
