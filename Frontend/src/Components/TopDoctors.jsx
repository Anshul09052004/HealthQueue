import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";

import { useNavigate } from "react-router-dom";

function TopDoctors() {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

    return (
        <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Top <span className="text-blue-600">Doctors</span> to Book
                </h1>
                <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                    Compassionate doctors dedicated to providing quality care, accurate
                    treatment, and a patient-first approach to improve health and
                    well-being.
                </p>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center border border-gray-100 hover:-translate-y-2"
                    >
                        {/* Doctor Image */}
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-24 w-24 object-cover rounded-full border-4 border-blue-100 shadow-sm"
                            />
                            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        </div>

                        {/* Doctor Info */}
                        <p className="mt-4 text-lg font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.speciality}</p>

                        {/* Availability Badge */}
                        <span className="mt-2 inline-block px-4 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Available
                        </span>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <div className="flex justify-center mt-14">
                <button
                    onClick={() => {
                        navigate("/doctors");
                        window.scrollTo(0, 0);
                    }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                >
                    View All Doctors
                </button>
            </div>
        </section>
    );
}

export default TopDoctors;
