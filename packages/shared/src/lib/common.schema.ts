import { Type } from "@sinclair/typebox";

export const BaseResponseSchema = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
});
