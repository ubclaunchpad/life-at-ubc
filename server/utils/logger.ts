import pino from "pino";

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    prettyPrint: {
        levelFirst: true
    }
});

export default logger;
