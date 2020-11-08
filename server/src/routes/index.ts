import express from "express";
import prereq from "./prereq";
import section from "./coursesection";

const router = express.Router();

router.use("/api", prereq);
router.use("/api", section);

export default router;

