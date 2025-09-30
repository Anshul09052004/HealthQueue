import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyAppoinment() {
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);
  const [apppointment, setAppoinment] = React.useState([]);

  // Fetch appointments
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

  // Cancel appointment
  const cancelAppoinment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getUserAppoinment();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/v1/user/verify-razorpay`,
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (data.success) {
            getUserAppoinment();
            navigate("/my-appoinment");
            toast.success("Payment verified successfully");
          }
        } catch (error) {
          console.error("Error in payment verification:", error);
          toast.error("Payment verification failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/payment-razorpay`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.error("Error in payment:", error);
      toast.error("Payment failed");
    }
  };


  useEffect(() => {
    if (token) getUserAppoinment();
  }, [token]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        My Appointments
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {apppointment.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex gap-6 items-center"
          >
            {/* Doctor Image */}
            <div className="relative w-32 h-32 shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name || "Doctor"}
                className="w-full h-full rounded-2xl object-cover shadow-md"
              />
            </div>

            {/* Doctor Info & Buttons */}
            <div className="flex flex-col justify-between flex-1">
              <div>
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

              {/* Buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                {!item.cancelled && item.payment && (
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md cursor-not-allowed">
                    Payment Done
                  </button>
                )}

                {!item.cancelled && (
                  <>
                    <button
                      onClick={() => cancelAppoinment(item._id)}
                      className="px-4 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500 transition cursor-pointer"
                    >
                      Cancel Appointment
                    </button>

                    {!item.payment && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer"
                      >
                        Pay Online
                      </button>
                    )}
                  </>
                )}

                {item.cancelled && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md cursor-not-allowed">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppoinment;
