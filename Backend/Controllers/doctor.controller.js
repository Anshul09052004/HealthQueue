import Doctor from "../Models/doctor.model.js";
const doctorList = async (req, res) => {
  try {
  const doctors = await Doctor.find({}).select(["-password", "-email"]);

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export { doctorList };