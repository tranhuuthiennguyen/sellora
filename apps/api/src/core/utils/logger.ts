import { env } from "@/config";
import pino, { Logger } from "pino";

const logger: Logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:HH:MM:ss TT Z o",
      ignore: "pid,hostname",
    },
  },
  level: String(env.log.level),
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
