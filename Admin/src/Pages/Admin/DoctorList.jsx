import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

function DoctorList() {
  const { doctors, getAllDoctors, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Doctor Image */}
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* Doctor Details */}
            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-500 mt-1">{item.speciality}</p>
         
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
