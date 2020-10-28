import express from "express";
import bodyParser from "body-parser";
import db from "./database/db";
import expressPino from "express-pino-logger";
import parentLogger from "../utils/logger";
import scraper from "../utils/scraper";

const log = parentLogger.child({ module: "router" });
const expressLogger = expressPino(log);
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(expressLogger);

app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`);
});

async function testDb() {
    try {
        const { rows } = await db.query("SELECT NOW()");
        log.info(`Postgresql connected ${rows[0].now}`);
    } catch (e) {
        log.error(`error ${e}`);
    }
}

// If docker isn't set up yet, this should error if you dont have postgres installed
testDb();
