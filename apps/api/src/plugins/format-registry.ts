import fp from "fastify-plugin";
import { Format } from "@fastify/type-provider-typebox";
import { IsEmail } from "@sellora/shared";

export default fp(async (app) => {
  Format.Set("email", (value) => IsEmail(value));
});
