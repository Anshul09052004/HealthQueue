import { Router } from "express";
import { doctorList } from "../Controllers/doctor.controller.js";

const router = Router();

// GET request for fetching doctors
router.get("/list", doctorList);

export default router;
