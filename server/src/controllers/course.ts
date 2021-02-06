import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/courses" });

export const getCourses = async (req: Request, res: Response) => {
    log.info("GET api/courses");
    try {
        const { rows } = await db.query("SELECT * FROM course");
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    log.info("GET api/course");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT * FROM course 
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

export const getCourseSections = async (req: Request, res: Response) => {
    log.info("GET api/course/sections");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT sections FROM course 
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

// TODO
export const getCourseSection = async (req: Request, res: Response) => {
    log.info("GET api/course/section");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    log.info(`coursetitle ${req.params.coursetitle}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const coursetitle = req.params.coursetitle;
    const query =
    `SELECT sections FROM course 
    WHERE coursedept=$1 AND coursenumber=$2`;
    const values = [coursedept, coursenumber];
    let response: any[];
    try {
        const { rows } = await db.query(query, values);
        // parse JSON from query result, append to response & return
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};
