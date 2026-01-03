import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import addFormats from "ajv-formats";

const ajvInstance = new Ajv({
  allErrors: true,
  strict: false,
  coerceTypes: true,
});

AjvErrors(ajvInstance);

export const ajv = addFormats(ajvInstance, [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
]);
