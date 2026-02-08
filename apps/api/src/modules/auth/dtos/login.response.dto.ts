import { apiResponseSchema } from "@/core/api/api.response";
import { userResponseDtoSchema } from "@/modules/user/dtos/user.response.dto";
import Type from "typebox";

export const loginUserResponseDtoSchema = apiResponseSchema({
  accessToken: Type.String(),
  user: userResponseDtoSchema,
});
