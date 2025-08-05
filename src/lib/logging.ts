import pino, { type Logger } from "pino";

let logger: Logger | null = null;

function InitializeLogger(): Logger {
  if (!logger) {
    logger = pino();
  }

  return logger
}

export function getLogger() {
  return InitializeLogger()
}

// export function InitializeLogger(): Logger {
//   if (!logger) {
//     const isDevelopment = process.env.NODE_ENV === "development";
//
//     logger = pino({
//       level: process.env["LOG_LEVEL"] || (isDevelopment ? "debug" : "info"),
//
//       transport: isDevelopment
//         ? {
//             target: "pino-pretty",
//             options: {
//               colorize: true,
//               translateTime: "HH:MM:ss Z",
//               ignore: "pid,hostname",
//             },
//           }
//         : undefined,
//
//       base: {
//         pid: process.pid,
//         hostname: process.env["HOSTNAME"] || "localhost",
//         service: process.env["SERVICE_NAME"] || "notification-service",
//       },
//
//       timestamp: pino.stdTimeFunctions.isoTime,
//
//       serializers: {
//         err: pino.stdSerializers.err,
//         req: pino.stdSerializers.req,
//         res: pino.stdSerializers.res,
//       },
//     });
//   }
//
//   return logger;
// }
//
// export function getLogger(): Logger {
//   return InitializeLogger();
// }
