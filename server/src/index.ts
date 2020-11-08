import express from "express";
import bodyParser from "body-parser";
import db from "./database/db";
import expressPino from "express-pino-logger";
import parentLogger from "../utils/logger";
import scraper from "../utils/scraper";
import { setupDb } from "./database/setup";
import baseRouter from "./routes/index";

const log = parentLogger.child({ module: "router" });
const expressLogger = expressPino(log);
const PORT = process.env.PORT || 5000;

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
setupDb();
