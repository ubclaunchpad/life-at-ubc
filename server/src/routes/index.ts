import express from "express";
import course from "./course";

const router = express.Router();

router.use("/api", course);

export default router;

