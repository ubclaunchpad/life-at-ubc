import express from "express";
import bodyParser from "body-parser";
import db from "./database/db";
import expressPino from "express-pino-logger";
import parentLogger from "../utils/logger";
import scraper from "../utils/scraper";
import cron from "node-cron";
import { setupDb } from "./database/setup";
import baseRouter from "./routes/index";

const log = parentLogger.child({ module: "express" });
const expressLogger = expressPino(log);
const PORT = process.env.PORT || 5000;
// asterisks in order are: minute hour day-of-month month day-of-week
// the below means that the script runs at 12 am every 1st of the month
const crontab = "0 15 5 * *";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(expressLogger);
app.use("/", baseRouter);

cron.schedule(crontab, () => {
    scraper().then(() => {
        log.info("Updating database.");
        setupDb(true);
    });
}, { scheduled: true,
     timezone: "America/Los_Angeles"
});

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
// testDb();
setupDb(true);
