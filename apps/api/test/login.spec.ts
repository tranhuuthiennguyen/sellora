// test/login.test.ts
import { describe, it, expect } from "vitest";
import { buildTestServer } from "./setup";

describe("POST /auth/login", () => {
  it("should reject invalid email", async () => {
    const app = await buildTestServer();

    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "bademail",
        password: "Password123!",
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it("should login a valid user", async () => {
    const app = await buildTestServer();

    const res = await app.inject({
      method: "POST",
      url: "/auth/auth/login",
      payload: {
        email: "test@example.com",
        password: "Password123!",
      },
    });

    expect(res.statusCode).toBe(200);

    const json = res.json();
    expect(json).toHaveProperty("user");
  });
});
