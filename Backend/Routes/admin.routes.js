import { Router } from "express";
import upload from "../Middlewares/multer.middleware.js";
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentAdmin, appointmentCancel } from "../Controllers/admin.controller.js";
import authAdmin from "../Middlewares/auth.middleware.js";

const router = Router();
router.post('/add-doctor', upload.single("image"), addDoctor);
router.post('/login', adminLogin);
router.post('/all-doctors', allDoctors);
router.get('/appointments', appointmentAdmin);
router.post('/cancel-appointment', appointmentCancel);
router.get('/dashboard', adminDashboard);

export default router;