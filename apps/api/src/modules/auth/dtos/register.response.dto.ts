import { apiResponseSchema } from "@/core/api/api.response";
import { idDtoSchema } from "@/core/api/id.response.dto";

export const registerUserResponseDtoSchema = apiResponseSchema({
  idDtoSchema,
});
