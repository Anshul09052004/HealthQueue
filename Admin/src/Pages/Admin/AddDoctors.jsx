import uploadarea from "../../Assets/upload_area.svg";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";


function AddDoctors() {
    const { backendUrl, aToken } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [speciality, setSpeciality] = useState("General Physician");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [degree, setDegree] = useState("");
    const [about, setAbout] = useState("");
    const [fees, setFees] = useState("");

    const onSubmitHandler = async (e) => {
        if (!docImg) {
            toast.error("Please upload doctor image");
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("speciality", speciality);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("degree", degree);
        formData.append("about", about);
        formData.append("fees", fees);
        formData.append("image", docImg);

        try {
            const { data } = await axios.post(backendUrl + "/api/v1/doctor/add-doctor", formData, { headers: { token: aToken } });
           
            if (data.success) {
                toast.success("Doctor added successfully");
                setDocImg(false);
                setName("");
                setEmail("");
                setSpeciality("General Physician");
                setPassword("");
                setExperience("1 Year");
                setDegree("");
                setAbout("");
                setFees("");
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto border border-gray-100">
            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">➕ Add Doctor</h2>
                <p className="text-gray-500 mt-2 text-sm">
                    Fill out the details below to register a new doctor
                </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-8">
                {/* Upload Image */}
                <div className="flex flex-col items-center space-y-3">
                    <label
                        htmlFor="doc-Img"
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : uploadarea}
                            alt="Upload"
                            className="w-28 h-28 object-cover border-2 border-dashed border-gray-300 rounded-full p-3 hover:border-blue-500 transition"
                        />
                        <span className="text-sm text-gray-600 mt-2 font-medium">
                            Upload Profile Image
                        </span>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-Img" hidden />
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Doctor Name
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Enter name"
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Doctor Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter password"
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Experience
                        </label>
                        <select
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}

                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={`${i + 1} Year`}>
                                    {i + 1} Year
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fees */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Doctor Fees
                        </label>
                        <input
                            onChange={(e) => setFees(e.target.value)}
                            value={fees}
                            type="number"
                            placeholder="Enter fees"
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Speciality */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Speciality
                        </label>
                        <select
                            onChange={(e) => setSpeciality(e.target.value)}
                            value={speciality}
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            <option>General Physician</option>
                            <option>Gynecologist</option>
                            <option>Dermatologist</option>
                            <option>Pediatrician</option>
                            <option>Neurologist</option>
                            <option>Gastorenterologist</option>
                        </select>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Education
                        </label>
                        <input
                            onChange={(e) => setDegree(e.target.value)}
                            value={degree}
                            type="text"
                            placeholder="Enter education"
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>

                {/* About */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        About
                    </label>
                    <textarea
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                        type="text"
                        placeholder="Write a short description about the doctor..."
                        rows="4"
                        className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                    >
                        🚀 Add Doctor
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDoctors;
