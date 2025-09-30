import { Router } from "express";
import { bookAppoinment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import { authUser } from "../Middlewares/user.middleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/get-profile", authUser, getProfile);
router.post('/update-profile', authUser, upload.single("image"), updateProfile);
router.post('/book-appointment', authUser, bookAppoinment);
router.get('/appointments', authUser, listAppointment);
router.post('/cancel-appointment', authUser, cancelAppointment);
router.post('/payment-razorpay', authUser, paymentRazorpay);
router.post('/verify-razorpay', authUser, verifyRazorpay);


export default router;
