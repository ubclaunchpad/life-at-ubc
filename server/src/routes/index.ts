import express from "express";
import parentLogger from "../../utils/logger";

const log = parentLogger.child({ module: "router" });
const router = express.Router();

router.get("/api", (req, res) => {
    log.info("GET /api");
    let sampleresponse = { test: "test", route: "/api" };
    res.json(sampleresponse);
});

export default router;

