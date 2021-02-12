import express from "express";
import prereq from "./prereq";
import course from "./course";

const router = express.Router();

router.use("/api", prereq);
router.use("/api", course);

export default router;

