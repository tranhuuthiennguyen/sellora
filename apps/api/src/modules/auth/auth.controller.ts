import { handleServerError } from "@/helpers/errors.helper";
import { FastifyReply, FastifyRequest } from "fastify";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
  } catch (error) {
    return handleServerError(reply, error);
  }
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
  } catch (error) {
    return handleServerError(reply, error);
  }
};
