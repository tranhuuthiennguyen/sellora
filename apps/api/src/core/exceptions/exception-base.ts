import { getRequestId } from "../app/app-request.context";

export interface SerializedException {
  message: string;
  error: string;
  correlationId: string;
  statusCode?: number;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  abstract error: string;
  abstract statusCode: number;

  public readonly correlationId: string;

  /**
   *
   * @param {string} message
   * @param cause
   * @param {Object} metadata
   */
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);

    this.correlationId = getRequestId();
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      error: this.error,
      statusCode: this.statusCode,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
