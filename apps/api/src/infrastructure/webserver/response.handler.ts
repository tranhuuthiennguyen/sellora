import { ResponseInterface } from "@/core/interface/response.interface";
import { FastifyReply } from "fastify";
import parseResponse from "./response.parser";

export const responseSender = async (
  data: ResponseInterface,
  reply: FastifyReply,
): Promise<void> => {
  reply.send(data);
};
const responseHandler = async (
  next: () => ResponseInterface | PromiseLike<ResponseInterface>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const data: ResponseInterface = await next();
    responseSender(parseResponse(data), reply);
  } catch (error: any) {
    responseSender(parseResponse(error), reply);
  }
};

export default responseHandler;
