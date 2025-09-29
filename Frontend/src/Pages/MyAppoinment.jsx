import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

function MyAppoinment() {
  const { backendUrl, token } = useContext(AppContext);
  const [apppointment, setAppoinment] = React.useState([]);

  // Fetch appointments on mount
  const getUserAppoinment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAppoinment(data.appoinments.reverse());
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Cancel appointment and update local state immediately
  const cancelAppoinment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");

        // Update local state instantly
        setAppoinment((prev) =>
          prev.map((app) =>
            app._id === appointmentId ? { ...app, cancelled: true } : app
          )
        );
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  useEffect(() => {
    if (token) getUserAppoinment();
  }, [token]);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-10 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
        My Appointments
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {apppointment.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center"
          >
            {/* Doctor Image */}
            <div className="relative w-28 h-28">
              <img
                src={item.docData.image}
                alt={item.docData.name || "Doctor"}
                className="w-full h-full rounded-full object-cover border-4 border-blue-200 shadow-lg"
              />
              {item.cancelled && (
                <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  Cancelled
                </span>
              )}
            </div>

            {/* Doctor Info */}
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-gray-900">
                {item.docData.name || "Unknown Doctor"}
              </p>
              <p className="text-md text-blue-600 font-medium mt-1">
                {item.docData.speciality || "Specialist"}
              </p>
              <p className="text-sm mt-2 text-gray-700">
                <span className="font-medium">Date & Time:</span>{" "}
                {item.slotDate} - {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {!item.cancelled && (
                <>
                  <button
                    onClick={() => cancelAppoinment(item._id)}
                    className="px-5 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-300"
                  >
                    Cancel
                  </button>
                  <button className="px-5 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300">
                    Pay Online
                  </button>
                </>
              )}
              {item.cancelled && (
                <button className="px-5 py-2 bg-gray-400 text-white rounded-xl shadow-md cursor-not-allowed">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppoinment;
