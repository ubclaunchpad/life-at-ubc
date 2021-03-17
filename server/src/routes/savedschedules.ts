import express from "express";
import { getSchedule, saveSchedule } from "../controllers/savedschedules";

const router = express.Router();

router.get("/savedschedules/:id", getSchedule);

router.post("/savedschedules/", saveSchedule);

export default router;
