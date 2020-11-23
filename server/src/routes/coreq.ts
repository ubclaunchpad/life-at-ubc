import express from "express";
import { getCoreqs, getCoreq } from "../controllers/coreq";

const router = express.Router();

// Get all data from co-req table populated in ctrller
router.get("/coreqs", getCoreqs);

 // API endpoint - get data for a course, from table
 //                                      populated in ctrller
router.get("/coreq/:coursedept/:coursenumber", getCoreq);
export default router;
