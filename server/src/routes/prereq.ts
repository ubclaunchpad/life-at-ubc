import express from "express";
import { getPrereqs } from "../controllers/prereq";

const router = express.Router();

/**
 * End point for getting all rows in prereq table
 * When endpoint is hit, call back function imported from controllers is triggered
 */
router.get("/prereqs", getPrereqs);

export default router;
