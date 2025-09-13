import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContextProvider";
import { useParams } from "react-router-dom";
import verifyicon from "../Assets/verified_icon.svg";
import infoicon from "../Assets/info_icon.svg";
import RelatedDoctors from "../Components/RelatedDoctors";


function Appoinments() {
  const { DocId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSoltIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc.id === DocId);
    setDocInfo(docInfo);
  };

  const getAvailabelSlots = () => {
    setDocSlots([]);
    let today = new Date();

   for (let i = 0; i < 7; i++) {
  let currentDate = new Date(today);
  currentDate.setDate(today.getDate() + i);

  let endTime = new Date(currentDate);
  endTime.setHours(21, 0, 0, 0);

  if (today.getDate() === currentDate.getDate()) {
    currentDate.setHours(
      currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
    );
    currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  } else {
    currentDate.setHours(10);
    currentDate.setMinutes(0);
  }

  let timeSlots = [];

  // 👉 अब केवल तब ही loop चलाओ जब आज के लिए slot बचा हो
  while (currentDate < endTime) {
    let formatedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    timeSlots.push({
      dateTime: new Date(currentDate),
      time: formatedTime,
    });

    currentDate.setMinutes(currentDate.getMinutes() + 30);
  }

  // 👉 अगर timeSlots empty है तो मत add करो
  if (timeSlots.length > 0) {
    setDocSlots((prev) => [...prev, timeSlots]);
  }
}

  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, DocId]);

  useEffect(() => {
    getAvailabelSlots();
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[0].length > 0) {
      setSlotTime(docSlots[0][0].time);
    }
  }, [docSlots]);


  return (
    docInfo && (
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg mt-10 border border-gray-200">
        {/* Doctor Image */}
        <div className="flex justify-center">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>

        {/* Doctor Name */}
        <div className="text-center mt-5">
          <p className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-800">
            {docInfo.name}
            <img src={verifyicon} alt="verified" className="w-6 h-6" />
          </p>
        </div>

        {/* Degree & Speciality */}
        <div className="text-center mt-3 text-gray-600">
          <p className="text-lg font-medium">
            {docInfo.degree} • {docInfo.speciality}
          </p>
          <p className="text-sm text-gray-500 italic">{docInfo.experience}</p>
        </div>

        {/* About Section */}
        <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="font-semibold text-gray-800 flex items-center gap-2 mb-3 text-lg">
            About
            <img src={infoicon} alt="info" className="w-5 h-5" />
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">
            {docInfo.about}
          </p>
        </div>

        {/* Appointment Fee */}
        <div className="mt-8 flex justify-center">
          <div className="px-6 py-3 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-gray-800">
              Appointment Fee:{" "}
              <span className="text-green-600 font-bold">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-10">
          <p className="text-xl font-bold text-gray-800 mb-4">
            Booking Slots
          </p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-xl cursor-pointer text-center min-w-[80px] border ${index === slotIndex
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                    }`}
                  onClick={() => setSoltIndex(index)}
                >
                  <p className="text-sm font-medium">
                    {item[0] &&
                      daysOfWeek[new Date(item[0].dateTime).getDay()]}
                  </p>
                  <p className="text-xs">
                    {item[0] && new Date(item[0].dateTime).getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border text-center cursor-pointer ${slotTime === item.time
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                    }`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition font-semibold">
              Book Appointment
            </button>

          </div>
          <RelatedDoctors speciality={docInfo.speciality} docId={DocId} />
        </div>


      </div>



    )
  );
}

export default Appoinments;
