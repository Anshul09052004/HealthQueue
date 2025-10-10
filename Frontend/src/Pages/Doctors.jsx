import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContextProvider";
import { useNavigate, useParams } from "react-router-dom";

function Doctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const decodedSpeciality = speciality ? decodeURIComponent(speciality) : null;
  const [FilterDoc, setFilterDoc] = useState([]);

  const appllyFilter = () => {
    if (decodedSpeciality) {
      setFilterDoc(
        doctors.filter(
          (doctor) =>
            doctor.speciality.toLowerCase() === decodedSpeciality.toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    appllyFilter();
  }, [decodedSpeciality, doctors]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastorenterologist",
  ];

  return (
    <>
      {/* Heading */}
      <div className="text-center my-8 px-3">
        <p className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
          Browse through our <span className="text-blue-600">Doctors</span>
        </p>
        <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-base">
          Find the right specialist for your needs
        </p>
      </div>

      {/* Categories */}
      <div className="flex sm:flex-wrap sm:justify-center gap-3 sm:gap-4 mb-10 px-3 overflow-x-auto scrollbar-hide">
        {specialities.map((spec, index) => (
          <p
            key={index}
            onClick={() =>
              decodedSpeciality === spec
                ? navigate("/doctors")
                : navigate(`/doctors/${encodeURIComponent(spec)}`)
            }
            className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 border rounded-full 
              text-sm sm:text-base font-medium cursor-pointer 
              transition-all duration-300 transform hover:scale-105
              ${
                decodedSpeciality === spec
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-blue-600 border-blue-300 shadow-sm hover:bg-blue-600 hover:text-white"
              }`}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* Doctors List */}
      <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-10">
        {FilterDoc.length > 0 ? (
          FilterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appoinment/${item._id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 
                 transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={item.image || "/default_profile.png"}
                  alt={item.name}
                  className="w-full h-52 sm:h-60 md:h-64 object-top object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  Available
                </span>
              </div>
              <div className="p-3 sm:p-4 text-center">
                <p className="mt-1 text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No doctors available</p>
        )}
      </div>
    </>
  );
}

export default Doctors;
