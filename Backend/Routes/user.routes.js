import { Router } from "express";
import { bookAppoinment, getProfile, loginUser, registerUser, updateProfile } from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import { authUser } from "../Middlewares/user.middleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/get-profile", authUser, getProfile);
router.post('/update-profile', authUser, upload.single("image"), updateProfile);
router.post('/book-appointment',authUser, bookAppoinment);


export default router;
