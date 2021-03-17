import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/savedschedule" });

interface CourseSchedule {
    ScheduleId: number;
    Sections: any;
}

export const getSchedule = async (req: Request, res: Response) => {
    log.info("GET api/savedschedules");
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
        res.json(result);
    } catch (e) {
        log.info(e);
    }
};
