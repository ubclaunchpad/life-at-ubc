import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/prereq" });

/**
 * The following functions are triggered when requests to /api/prereqs* are made
 */

export const getPrereqs = async (req: Request, res: Response) => {
    log.info("GET api/prereqs");
    try {
        const { rows } = await db.query("SELECT * FROM prereq");
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getPrereq = async (req: Request, res: Response) => {
    log.info("GET api/prereq");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT * FROM prereq pr 
    WHERE pr.coursedept=$1 AND pr.coursenumber=$2`;
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
