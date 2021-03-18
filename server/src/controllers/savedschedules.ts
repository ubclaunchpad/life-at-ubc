import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/savedschedule" });


export const getSchedule = async (req: Request, res: Response) => {
    log.info("GET api/savedschedules");
    let scheduleid = req.params.id;
    const query =
    `SELECT * FROM savedschedules 
    WHERE scheduleid=$1`;
    const values = [scheduleid];
    try {
        const { rows } = await db.query(query, values);
        if (rows.length > 0) {
            res.status(200).json(rows[0].sections);
        } else {
            res.status(404).send("Schedule not found");
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

export const saveSchedule = async (req: Request, res: Response) => {
    log.info("POST api/savedschedules");
    let schedule = JSON.stringify(req.body.schedule);
    const query =
    `INSERT INTO SavedSchedules (sections)
    VALUES ($1) RETURNING scheduleid`;
    const values = [schedule];
    try {
        const result = await db.query(query, values);
        const scheduleid = result.rows[0].scheduleid;
        log.info(`SCHEDULE ID ` + scheduleid);
        res.status(200).send(JSON.stringify(scheduleid));
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
