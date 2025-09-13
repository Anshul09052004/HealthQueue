import React, { useState } from 'react';
import profileimage from '../Assets/profile_pic.png';

function MyProfile() {
    const [userData, setUserData] = useState({
        name: "Anshul Prajapat",
        image: profileimage,
        email: "tH0iM@example.com",
        phone: "1234567890",
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        dob: "1990-01-01"
    });

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-3xl transition-transform transform hover:scale-[1.01]">
                
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-300 pb-6">
                    <img 
                        src={userData.image} 
                        alt="profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex-1 text-center md:text-left">
                        {
                            isEdit ? (
                                <input 
                                    type="text" 
                                    value={userData.name}
                                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    className="text-3xl font-bold border-b-2 border-indigo-500 bg-transparent px-2 py-1 focus:outline-none w-full md:w-2/3"
                                />
                            ) : (
                                <h2 className="text-3xl font-bold text-gray-900">{userData.name}</h2>
                            )
                        }
                        <p className="text-gray-600 mt-1">{userData.email}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">📞 Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
                            <p className="text-xs uppercase text-gray-500">Phone</p>
                            {
                                isEdit ? (
                                    <input 
                                        type="tel" 
                                        value={userData.phone}
                                        onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                                    />
                                ) : (
                                    <p className="text-lg font-medium text-gray-800">{userData.phone}</p>
                                )
                            }
                        </div>
                        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
                            <p className="text-xs uppercase text-gray-500">Address</p>
                            {
                                isEdit ? (
                                    <input 
                                        type="text" 
                                        value={userData.address}
                                        onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
                                        className="w-full border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                                    />
                                ) : (
                                    <p className="text-lg font-medium text-gray-800">{userData.address}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">👤 Personal Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
                            <p className="text-xs uppercase text-gray-500">Gender</p>
                            {
                                isEdit ? (
                                    <select 
                                        value={userData.gender}
                                        onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        className="w-full border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <p className="text-lg font-medium text-gray-800">{userData.gender}</p>
                                )
                            }
                        </div>
                        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
                            <p className="text-xs uppercase text-gray-500">Date of Birth</p>
                            {
                                isEdit ? (
                                    <input 
                                        type="date" 
                                        value={userData.dob}
                                        onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                        className="w-full border-b border-gray-400 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                                    />
                                ) : (
                                    <p className="text-lg font-medium text-gray-800">{userData.dob}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                    {
                        isEdit ? (
                            <button 
                                onClick={() => setIsEdit(false)} 
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
