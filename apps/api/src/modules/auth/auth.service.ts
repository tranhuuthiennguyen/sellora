import { FastifyReply } from "fastify";

export const generateAccessToken = async (
  reply: FastifyReply,
  payload: any,
) => {
  return await reply.jwtSign(
    {
      id: payload.id,
    },
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = async (
  reply: FastifyReply,
  payload: any,
) => {
  return await reply.jwtSign(
    {
      id: payload.id,
    },
    {
      expiresIn: "30d",
    },
  );
};
