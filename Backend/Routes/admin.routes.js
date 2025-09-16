import { Router } from "express";
import upload from "../Middlewares/multer.middleware.js";
import { addDoctor } from "../Controllers/admin.controller.js";

const router = Router();
router.post('/add-doctor', upload.single("image"), addDoctor);
export default router;