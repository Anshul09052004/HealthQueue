import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { AppContext } from "../../Context/AppContext";
import { RxCross2 } from "react-icons/rx";

function AllAppoinment() {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, currency } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
                All Appointments
            </h2>

            {/* Table Container */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-7 gap-2 bg-blue-50 font-semibold text-blue-700 py-3 px-4 border-b text-sm md:text-base">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Table Rows */}
                {appointments && appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-7 gap-2 items-center py-4 px-4 border-b text-sm md:text-base hover:bg-blue-50 transition-all rounded-lg"
                        >
                            {/* Index */}
                            <p className="text-gray-700 font-medium">{index + 1}</p>

                            {/* Patient */}
                            <div className="flex items-center space-x-3">
                                <img
                                    src={item.userData?.image}
                                    alt="user"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                                />
                                <p className="font-semibold text-gray-800">
                                    {item.userData?.name || "Unknown"}
                                </p>
                            </div>

                            {/* Age */}
                            <p className="text-gray-600">
                                {item.userData?.dob ? calculateAge(item.userData.dob) : ""}
                            </p>

                            {/* Date & Time */}
                            <div className="text-gray-600">
                                <p className="font-medium">{item.slotDate || "N/A"}</p>
                                <p className="text-xs text-gray-400">{item.slotTime || "-"}</p>
                            </div>

                            {/* Doctor */}
                            <div className="flex items-center space-x-3">
                                <img
                                    src={item.docData?.image || "/default-doctor.png"}
                                    alt="doctor"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                                />
                                <p className="font-semibold text-gray-800">
                                    {item.docData?.name || "Unknown"}
                                </p>
                            </div>

                            {/* Fees */}
                            <p className="font-semibold text-gray-700">
                                {currency} {item.docData.fees}
                            </p>

                            {/* Action */}
                            <div className="flex justify-center mr-27">
                                {item.cancelled ? (
                                    <p className="text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded-full">
                                        Cancelled
                                    </p>
                                ) : (
                                    <RxCross2 onClick={() => cancelAppointment(item._id)}
                                        size={22}
                                        className="text-red-600 hover:text-white hover:bg-red-600 transition-all rounded-full p-1 cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-6 text-lg">
                        No Appointments Found
                    </p>
                )}
            </div>
        </div>
    );
}

export default AllAppoinment;
