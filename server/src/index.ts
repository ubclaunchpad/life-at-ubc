import express from "express";
import bodyParser from "body-parser";
import db from "./database/db";
import scraper from "../utils/scraper";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function testDb() {
    try {
        const { rows } = await db.query("SELECT NOW()");
        console.log(`Postgresql connected ${rows[0].now}`);
    } catch (e) {
        console.log(`error ${e}`);
    }
}

// If docker isn't set up yet, this should error if you dont have postgres installed
testDb();

// this should run and eventually output a single course's information at ../utils/output_test.json
// feel free to play around with the numbers here! (check documentation for usage)
scraper(145);