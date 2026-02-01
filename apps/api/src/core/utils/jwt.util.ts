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
});

const refreshTokenSigner = createSigner({
  key: privateKey,
  algorithm: "RS256",
  expiresIn: "30d",
});

const verifier = createVerifier({
  key: publicKey,
  algorithms: ["RS256"],
});

export { accessTokenSigner, refreshTokenSigner, verifier };
