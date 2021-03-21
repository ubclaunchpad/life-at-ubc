import express from "express";
import course from "./course";
import savedschedules from "./savedschedules";

const router = express.Router();

router.use("/api", course);
router.use("/api", savedschedules);

export default router;

