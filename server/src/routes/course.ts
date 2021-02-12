/**
 * TODO: Add endpoints for coursesection table, this will be the primary database table queried in our MVP
 * SEE section routes for examples
 */
import express from "express";
import { getCourses,
         getAllSections,
         getCourseSections,
         getCourseSectionsWithTerm
} from "../controllers/course";

const router = express.Router();

/**
 * Sample api endpoint for getting all rows in course table
 * When endpoint is hit, call back function imported from controllers is triggered
 */
router.get("/courses", getCourses);

router.get("/sections", getAllSections);

/**
 * Sample api endpoint for getting a specific course within coursesection table
 * analogous to getSections, gets all the sections of a specified course
 */
router.get("/section/:coursedept/:coursenumber", getCourseSections);

router.get("/section/:term/:coursedept/:coursenumber", getCourseSectionsWithTerm);

export default router;
