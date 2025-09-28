import React, { useState, useContext } from 'react';
import { AppContext } from "../Context/AppContextProvider";
import uploadimg from '../Assets/upload_area.png';
import { toast } from 'react-toastify';
import axios from "axios";

function MyProfile() {
    const { userData, setUserData, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const updateUserProfile = async () => {
        try {
            if (!userData.dob || userData.dob === "Not selected") {
                toast.error("Please select a valid Date of Birth");
                return;
            }

            const formData = new FormData();
            formData.append("userId", userData._id); // <-- Add userId here
            formData.append("name", userData.name || "");
            formData.append("phone", userData.phone || "");
            formData.append("dob", userData.dob);
            formData.append("gender", userData.gender || "");
            if (image) formData.append("image", image);

            const { data } = await axios.post(
                backendUrl + "/api/v1/user/update-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return userData && (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-2xl transition-transform duration-300 hover:scale-[1.01]">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-200 pb-6">
                    {isEdit ? (
                        <label htmlFor="image" className="cursor-pointer">
                            <div className="relative group">
                                <img
                                    src={image ? URL.createObjectURL(image) : userData.image}
                                    alt="profile-preview"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition"
                                />
                                {!image && (
                                    <img
                                        src={uploadimg}
                                        alt="upload"
                                        className="w-10 h-10 absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md"
                                    />
                                )}
                            </div>
                            <input type="file" id="image" className="hidden" onChange={e => setImage(e.target.files[0])} />
                        </label>
                    ) : (
                        <img src={userData.image} alt="profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                    )}

                    <div className="flex-1 text-center md:text-left">
                        {isEdit ? (
                            <input
                                type="text"
                                value={userData.name}
                                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                className="text-2xl font-bold border-b-2 border-indigo-500 bg-transparent px-2 py-1 focus:outline-none w-full md:w-3/4"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                        )}
                        <p className="text-gray-600 mt-1">{userData.email}</p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition">
                        <p className="text-xs uppercase text-gray-500">📞 Phone</p>
                        {isEdit ? (
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{userData.phone}</p>
                        )}
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition">
                        <p className="text-xs uppercase text-gray-500">👤 Gender</p>
                        {isEdit ? (
                            <select
                                value={userData.gender}
                                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{userData.gender}</p>
                        )}
                    </div>

                    <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition md:col-span-2">
                        <p className="text-xs uppercase text-gray-500">🎂 Date of Birth</p>
                        {isEdit ? (
                            <input
                                type="date"
                                value={userData.dob === "Not selected" ? "" : userData.dob}
                                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                className="w-full border-b border-gray-300 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{userData.dob}</p>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                    {isEdit ? (
                        <button
                            onClick={updateUserProfile}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition"
                        >
                            💾 Save Information
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition"
                        >
                            ✏️ Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
