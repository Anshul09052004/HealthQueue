import e from "express";
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    avalability: {
        type: Boolean,
        default: true
    },
    Date: {
        type: Number,
        default: Date.now
    },
    slots_booked: {
        type: Object,
        default: {}
    }
});

export default mongoose.model("doctor", doctorSchema);
