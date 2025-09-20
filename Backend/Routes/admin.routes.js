import { Router } from "express";
import upload from "../Middlewares/multer.middleware.js";
import { addDoctor, adminLogin, allDoctors } from "../Controllers/admin.controller.js";
import authAdmin from "../Middlewares/auth.middleware.js";

const router = Router();
router.post('/add-doctor', upload.single("image"), addDoctor);
router.post('/login', adminLogin);
router.post('/all-doctors', allDoctors);
export default router;