import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  // ---------------- DOCTORS STATE ----------------
  const [doctors, setDoctors] = useState([]);

  // ---------------- USER PROFILE ----------------
  const loadUserProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${backendUrl}/api/v1/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setUserData(data.user);
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  // ---------------- DOCTORS LIST ----------------
  const loadDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load doctors");
    }
  };

  // ---------------- USE EFFECTS ----------------
  useEffect(() => {
    if (token) loadUserProfileData();
    else setUserData(false);

    loadDoctorsData(); // ✅ doctors data fetch at app start
  }, [token]);

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
   loadDoctorsData,
    doctors, // ✅ doctors context me available
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
