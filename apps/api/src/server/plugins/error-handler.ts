import {
  ApiErrorResponse,
  apiErrorResponseSchema,
} from "@/core/api/api-error.response";
import { getRequestId } from "@/core/app/app-request.context";
import { ExceptionBase } from "@/core/exceptions";
import { FastifyError, FastifyErrorCodes, FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const fastifyErrorCodesMap = {
  FST_ERR_VALIDATION: (error: FastifyError) => ({
    subErrors: (error.validation ?? []).map((validationError) => ({
      [validationError.instancePath.split("/")[1]]: validationError.message,
    })),
    statusCode: 400,
    message: "VALIDATION_ERROR",
    error: "BAD_REQUEST",
  }),
  FST_ERR_NOT_FOUND: () => ({
    message: "NOT_FOUND",
    error: "NOT_FOUND",
    statusNode: 404,
  }),
};

async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError | Error | any, _, res) => {
    const fastifyError =
      "code" in error
        ? fastifyErrorCodesMap[error.code as keyof FastifyErrorCodes]
        : undefined;

    if (fastifyError) {
      const response = fastifyError(error);
      response.correlationId = getRequestId();
      return res.status(response.statusCode).send(response);
    }

    fastify.log.error(error);
    if (error instanceof ExceptionBase) {
      return res.status(error.statusCode).send({
        status: "failed",
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
        correlationId: getRequestId(),
      } satisfies ApiErrorResponse);
    }

    return res.status(500).send({
      status: "error",
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
      error: "Internal Server Error",
      correlationId: getRequestId(),
    } satisfies ApiErrorResponse);
  });

  fastify.addSchema(apiErrorResponseSchema);
}

export default fp(errorHandlerPlugin, {
  name: "errorHandler",
});
