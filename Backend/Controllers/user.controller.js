import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { cloudinary } from "../Utils/Cloudinary.js";
import path from "path";
import fs from "fs";
import Doctor from "../Models/doctor.model.js";
import Appointment from "../Models/appoinment.model.js"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        // Check user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userData = await User.findById(req.user.id).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update text fields
        await User.findByIdAndUpdate(userId, { name, phone, dob, gender });

        // Update image if provided
        if (imageFile) {
            const filePath = path.resolve(imageFile.path); // Absolute path
            const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "image" });

            await User.findByIdAndUpdate(userId, { image: uploadResult.secure_url });

            // Delete local file after uploading
            fs.unlinkSync(filePath);
        }

        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const bookAppoinment = async (req, res) => {
    try {

        const { docId, slotDate, slotTime } = req.body;
        const userId = req.user.id;
        console.log("BODY:", req.body);
        console.log("USER:", req.user);



        // Fetch doctor
        const docData = await Doctor.findById(docId).select("-password");
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }


        // Initialize slots_booked if undefined
        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        docData.slots_booked = slots_booked;
        await docData.save();

        const userData = await User.findById(userId).select("-password");

        // Prepare appointment data
        const appoinmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        };

        const newAppoinment = await Appointment.create(appoinmentData);

        res.status(200).json({ success: true, message: "Appointment booked successfully", newAppoinment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const listAppointment = async (req, res) => {
    try {
        const userId = req.user.id;
        const appoinments = await Appointment.find({ userId });
        res.status(200).json({ success: true, appoinments });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.user.id;
        const appointmentData = await Appointment.findById(appointmentId);
        if (appointmentData.userId !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }
        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppoinment, listAppointment, cancelAppointment };
