import { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom'
import homeicon from "../Assets/home_icon.svg"
import appoinmenticon from "../Assets/appointment_icon.svg"
import addicon from "../Assets/add_icon.svg"
import peopleicon from "../Assets/people_icon.svg"

function Sidebar() {
    const { aToken } = useContext(AdminContext);

    return (
        <>
            {aToken && (
                <aside className="h-screen w-64 bg-white shadow-lg flex flex-col py-6 px-4 border-r border-gray-200">
                    
                    <ul className="space-y-4">
                        <NavLink 
                            to="/admin-dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
                                    isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={homeicon} alt="home" className="h-6 w-6" />
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink 
                            to="/all-appoinments"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
                                    isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={appoinmenticon} alt="appointments" className="h-6 w-6" />
                            <p>Appointments</p>
                        </NavLink>

                        <NavLink 
                            to="/add-doctor"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
                                    isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={addicon} alt="add doctor" className="h-6 w-6" />
                            <p>Add Doctors</p>
                        </NavLink>

                        <NavLink 
                            to="/doctor-list"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
                                    isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <img src={peopleicon} alt="doctor list" className="h-6 w-6" />
                            <p>Doctor List</p>
                        </NavLink>
                    </ul>
                </aside>
            )}
        </>
    )
}

export default Sidebar
