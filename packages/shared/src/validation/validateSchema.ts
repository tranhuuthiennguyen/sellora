import { TAnySchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export const validateSchema = (schema: TAnySchema, data: any) => {
  const validator = TypeCompiler.Compile(schema);

  const isValid = validator.Check(data);

  if (!isValid) {
    for (const error of validator.Errors(data)) {
      console.log(error.message);
    }
  }
};
