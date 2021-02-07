import express from "express";
import prereq from "./prereq";
import section from "./coursesection";
import course from "./course";

const router = express.Router();

router.use("/api", prereq);
router.use("/api", section);
router.use("/api", course);

export default router;

