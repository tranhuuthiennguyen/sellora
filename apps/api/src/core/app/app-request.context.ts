import { requestContext } from "@fastify/request-context";

function getRequestId(): string {
  return requestContext.get("requestId")!;
}

export { getRequestId };
