import pino from "pino";

// Parent logger. If you want to make use of logging in a new file, you MUST import this and create a child logger
// See index.ts, db.ts, or scraper.ts for examples
const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    prettyPrint: {
        levelFirst: true    // this allows for nice formatted logs, but in production it's recommended to disable this
    }
});

export default logger;
