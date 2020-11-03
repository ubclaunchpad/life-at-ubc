import pino from "pino";
import dotenv from "dotenv";
dotenv.config();

let environment = (process.env.NODE_ENV) || "development";

// Parent logger. If you want to make use of logging in a new file, you MUST import this
// and create a child logger with constructor argument {module: "modulename"}
const logger = pino({
    /**
     * Sets the log level as LOG_LEVEL in env or defaults to "info"
     * If set to "info", all logs EXCEPT for "trace" and "debug" are shown
     * Change LOG_LEVEL to "trace" if you would like to see all log levels,
     * or "debug" if you want to see everything but trace logs.
     */
    level: process.env.LOG_LEVEL || "info",
    /**
     * Makes pretty (non-JSON) logs output to stdout. Should be disabled in
     * production
     */
    prettyPrint: (environment === "development")
});

export default logger;
