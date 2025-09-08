import React from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../Assets/assets.js";

function Speciality() {
    return (
        <section id="speciality" className="py-14 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Find by <span className="text-blue-600">Speciality</span>
                </h1>
                <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
                    Compassionate doctors dedicated to providing quality care, accurate
                    treatment, and a patient-first approach to improve health and
                    well-being.
                </p>
            </div>

            {/* Speciality Row */}
            <div className="flex flex-wrap justify-center gap-8 lg:flex-nowrap max-w-6xl mx-auto overflow-x-auto lg:overflow-x-visible pb-6 scrollbar-hide">
                {specialityData.map((item, index) => (
                    <Link onClick={() => scrollTo(0, 0)}
                        to={`/doctors/${item.speciality}`}
                        key={index}
                        className="flex flex-col items-center group min-w-[120px] transition-transform duration-300 hover:-translate-y-2"
                    >
                        {/* Image */}
                        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                            <img
                                src={item.image}
                                alt={item.speciality}
                                className="h-10 w-10 md:h-12 md:w-12 object-contain"
                            />
                        </div>

                        {/* Text */}
                        <p className="mt-3 text-gray-800 font-semibold text-sm md:text-base text-center transition-colors duration-300 group-hover:text-blue-600">
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Speciality;
