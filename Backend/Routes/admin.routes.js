import { Router } from "express";
import upload from "../Middlewares/multer.middleware.js";
import { addDoctor, adminLogin } from "../Controllers/admin.controller.js";
import authAdmin from "../Middlewares/auth.middleware.js";

const router = Router();
router.post('/add-doctor', upload.single("image"), addDoctor);
router.post('/login', adminLogin);
export default router;