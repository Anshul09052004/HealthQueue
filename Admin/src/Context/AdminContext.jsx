import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/v1/doctor/all-doctors", {}, { headers: { aToken } });
            if (data.success) {
                setDoctors(data.doctors);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);

        }

    }
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        aToken,
        setAToken, backendUrl,
        doctors,
        getAllDoctors
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider