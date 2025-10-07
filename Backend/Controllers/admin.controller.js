import bcrypt from "bcrypt";
import validator from "validator";
import Doctor from "../Models/doctor.model.js";
import { cloudinary } from "../Utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import Appointment from "../Models/appoinment.model.js";

const addDoctor = async (req, res, next) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });

    const imageURL = imageUpload.secure_url;

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      image: imageURL
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);
        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export { addDoctor, adminLogin, allDoctors, appointmentAdmin, appointmentCancel };
