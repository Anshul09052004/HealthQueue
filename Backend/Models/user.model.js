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
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
    },
    image: {
          public_id: {
            type: String,
            required: false,
        },
        secure_url: {
            type: String,
        }
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
    address: {
        line1: {
            type: object,
           
        },
        line2: {
            type: String,
            
        },
    },

});

export default mongoose.model("user", userSchema);
