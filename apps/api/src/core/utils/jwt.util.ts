import { env } from "@/config";
import { createSigner, createVerifier } from "fast-jwt";
import { readFileSync } from "fs";
import path from "path";

const privateKey = readFileSync(
  path.join(__dirname, "../../certs/private.key"),
  "utf8",
);

const publicKey = readFileSync(
  path.join(__dirname, "../../certs/public.key"),
  "utf8",
);

const accessTokenSigner = createSigner({
  key: privateKey,
  algorithm: "RS256",
  expiresIn: "7d",
  iss: env.server.host,
  aud: env.server.host,
});

const refreshTokenSigner = createSigner({
  key: privateKey,
  algorithm: "RS256",
  expiresIn: "30d",
  iss: env.server.host,
  aud: env.server.host,
});

const verifier = createVerifier({
  key: publicKey,
  algorithms: ["RS256"],
  allowedIss: env.server.host,
  allowedAud: env.server.host,
});

export { accessTokenSigner, refreshTokenSigner, verifier };
