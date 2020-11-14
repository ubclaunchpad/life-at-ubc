import express from "express";
import { getPrereqs, getPrereq } from "../controllers/prereq";

const router = express.Router();

/**
 * Sample api endpoint for getting all rows in prereq table
 * When endpoint is hit, call back function imported from controllers is triggered
 */
router.get("/prereqs", getPrereqs);

/**
 * Sample api endpoint for getting a specific course within prereq table
 */
router.get("/prereq/:coursedept/:coursenumber", getPrereq);

export default router;
