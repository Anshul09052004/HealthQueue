import { Router } from "express";
import { doctorList } from "../Controllers/doctor.controller.js";

const router = Router();
router.post('/list', doctorList);
export default router;