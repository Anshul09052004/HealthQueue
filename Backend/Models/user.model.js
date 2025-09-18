import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: false
    },
    gender: {
        type: String,
        default: "Not selected",
    },
    dob: {
        type: String,
        default: "Not selected",
    },
    phone: {
        type: String,
        default: "0000000000",
    },

});

export default mongoose.model("user", userSchema);
