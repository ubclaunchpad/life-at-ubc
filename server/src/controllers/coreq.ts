import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/coreq" });

export const getCoreqs = async (req: Request, res: Response) => {
    log.info("GET api/coreqs");
    try {
        const { rows } = await db.query("SELECT * FROM coreq");
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getCoreq = async (req: Request, res: Response) => {
    log.info("GET api/coreq");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT * FROM coreq pr
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
