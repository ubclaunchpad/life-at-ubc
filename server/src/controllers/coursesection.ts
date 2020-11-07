/**
 * TODO: Add controller functions which will be triggered when /api/coursesection endpoint is hit
 * SEE sections controller for examples
 */
import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/coursesection" });

/**
 * The following functions are triggered when requests to /api/sections* are made
 */

export const getSections = async (req: Request, res: Response) => {
    log.info("GET api/sections");
    try {
        const { rows } = await db.query("SELECT * FROM coursesection");
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getSection = async (req: Request, res: Response) => {
    log.info("GET api/section");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT * FROM coursesection 
    WHERE coursedept=$1 AND coursenumber=$2`;
    const values = [coursedept, coursenumber];
    try {
        const { rows } = await db.query(query, values);
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};
