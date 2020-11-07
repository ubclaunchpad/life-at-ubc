import express from "express";
import prereq from "./prereq";

const router = express.Router();

router.use("/api", prereq);
/**
 * TODO: Add route for coursesections
 */

export default router;

