import React, { useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";

function MyAppoinment() {
  const { doctors } = useContext(AppContext);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        My Appointments
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
          >
            {/* Doctor Image */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
            </div>

            {/* Doctor Info */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-blue-600 font-medium">
                {item.speciality}
              </p>
           
              <p className="text-sm mt-2">
                <span className="font-medium text-gray-700">Date & Time:</span>{" "}
                <span className="text-gray-800">23, July, 2025</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex justify-center gap-4">
              <button className="px-4 py-2 bg-red-500  cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-red-600 transition">
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500  cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-green-600 transition">
                Pay Online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppoinment;
