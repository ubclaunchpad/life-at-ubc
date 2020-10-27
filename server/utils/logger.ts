import pino from "pino";

let environment = (process.env.NODE_ENV) || "development";

// Parent logger. If you want to make use of logging in a new file, you MUST import this and create a child logger
// See index.ts, db.ts, or scraper.ts for examples
const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    prettyPrint: (environment === "development")    // makes nice pretty logs but should be disabled for production
});

export default logger;
