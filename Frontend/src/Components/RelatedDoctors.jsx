import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";

function RelatedDoctors({ speciality, docId }) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc.id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
      {relDoc.map((item, index) => (
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
  );
}

export default RelatedDoctors;
