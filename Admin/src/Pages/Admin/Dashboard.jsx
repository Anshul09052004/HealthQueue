import React, { useEffect, useContext } from 'react';
import doctoricon from '../../assets/doctor_icon.svg';
import appointmenticon from '../../assets/appointments_icon.svg';
import patienticon from '../../assets/patients_icon.svg';
import listicon from '../../assets/list_icon.svg';
import { AdminContext } from '../../Context/AdminContext';

function Dashboard() {
    const { aToken, dashData, cancelAppointment, getDashData } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) getDashData();
    }, [aToken]);

    return dashData && (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Dashboard Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {/* Doctors */}
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <img src={doctoricon} alt="Doctors" className="w-12 h-12 mr-4" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{dashData.doctors}</p>
                        <p className="text-gray-500">Doctors</p>
                    </div>
                </div>

                {/* Appointments */}
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <img src={appointmenticon} alt="Appointments" className="w-12 h-12 mr-4" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{dashData.appointments}</p>
                        <p className="text-gray-500">Appointments</p>
                    </div>
                </div>

                {/* Patients */}
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <img src={patienticon} alt="Patients" className="w-12 h-12 mr-4" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700">{dashData.patients}</p>
                        <p className="text-gray-500">Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <img src={listicon} alt="Latest Bookings" className="w-6 h-6 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-700">Latest Appointments</h2>
                </div>

                <div className="space-y-4">
                    {dashData.latestAppointments.map((item, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <img
                                src={item.docData.image}
                                alt={item.docData.name}
                                className="w-14 h-14 rounded-full object-cover mr-4"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{item.docData.name}</p>
                                <p className="text-gray-500">{item.slotDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
