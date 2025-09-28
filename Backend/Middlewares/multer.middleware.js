import multer from "multer";
import path from "path";

// ensure 'uploads/' folder exists in your backend root
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // folder path
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

export default upload;
