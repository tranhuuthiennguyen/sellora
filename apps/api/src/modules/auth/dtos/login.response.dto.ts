import { userResponseDtoSchema } from "@/modules/user/dtos/user.response.dto";
import Type from "typebox";

export const loginUserResponseDtoSchema = Type.Object({
  accessToken: Type.String(),
  user: userResponseDtoSchema,
});
