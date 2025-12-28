import { IdDtoSchema } from "./id.response.dto";

export const BaseResponseDtoSchema = {
  affOf: [
    {
      type: "object",
      properties: {
        createdAt: {
          type: "string",
        },
        updatedAt: {
          type: "string",
        },
      },
      required: ["createdAt", "updatedAt"],
    },
    IdDtoSchema,
  ],
};
