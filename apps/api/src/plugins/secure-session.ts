import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import path from "path";
import * as fs from "node:fs";
import fastifySecureSession from "@fastify/secure-session";

export default fp(async (fastify: FastifyInstance) => {
  const keyPath = path.join(process.cwd(), "secret-key.key");

  if (!fs.existsSync(keyPath)) {
    fastify.log.error("Missing session secret key file. Run:");
    fastify.log.error("npx --yes @fastify/secure-session > secret-key");
    throw new Error("Session secret key file not found.");
  }

  fastify.register(fastifySecureSession, {
    sessionName: "session",
    cookieName: "auth-session-cookie",
    key: fs.readFileSync(keyPath),
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 1 day
    },
  });

  fastify.log.info("Secure session plugin registered.");
});
