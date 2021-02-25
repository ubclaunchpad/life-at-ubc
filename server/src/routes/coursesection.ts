/**
 * TODO: Add endpoints for coursesection table, this will be the primary database table queried in our MVP
 * SEE section routes for examples
 */
import express from "express";
import { getSections, getSection, getSectionWithTerm } from "../controllers/coursesection";

const router = express.Router();

/**
 * Sample api endpoint for getting all rows in coursesection table
 * When endpoint is hit, call back function imported from controllers is triggered
 */
// router.get("/sections", getSections);

/**
 * Sample api endpoint for getting a specific course within coursesection table
 */
router.get("/section/:coursedept/:coursenumber", getSection);

router.get("/section/:term/:coursedept/:coursenumber", getSectionWithTerm);

export default router;
