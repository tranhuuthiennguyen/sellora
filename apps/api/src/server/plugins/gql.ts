import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import path from "path";

const getGQL = async () => {
  const typesArraySchema = await loadFiles(path.join(__dirname, "../../"), {
    extensions: [".graphql-schema.ts", ".graphql-schema.js"],
  });

  const typeDefsSchema = mergeTypeDefs(typesArraySchema, {
    throwOnConflict: true,
  });
  return print(typeDefsSchema);
};

export default getGQL;
