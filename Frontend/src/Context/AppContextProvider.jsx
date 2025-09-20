import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token,setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);


  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl

  };
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/v1/anshul/list")
      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    getDoctorsData()
  }, [])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
