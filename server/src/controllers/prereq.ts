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
