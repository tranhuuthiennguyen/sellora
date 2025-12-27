import pino, { Logger } from "pino";
import * as dotenv from "dotenv";
import { envPath } from "@/infrastructure/config";

dotenv.config({ path: envPath });

const logger: Logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:HH:MM:ss TT Z o",
      ignore: "pid,hostname",
    },
  },
  level: process.env.LOG_LEVEL,
  redact: ["req.headers.authorization", "req.headers.cookie"],
  // serializers: {
  //   req (request) {
  //     return {
  //       method: request.method,
  //       url: request.url,
  //       headers: request.headers,
  //       host: request.host,
  //       remoteAddress: request.ip,
  //       remotePort: request.socket.remotePort
  //     }
  //   }
  // }
});

export default logger;
