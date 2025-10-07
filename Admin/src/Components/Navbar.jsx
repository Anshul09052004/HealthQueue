import React, { useContext } from 'react'
import adminlogo from '../assets/admin_logo.svg'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate();
    const { aToken,setAToken } = useContext(AdminContext);
    const logout=()=>{
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
    }

    return (
        <nav className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg px-8 py-4 flex items-center justify-between rounded-b-2xl">
            
            {/* Left side */}
            <div className="flex items-center gap-3">
                <img src={adminlogo} alt="logo" className="h-12 w-12 rounded-full border-2 border-white shadow-md" />
                <p className="text-xl font-bold text-white tracking-wide">
                    {aToken ? "Admin" : "Doctor"}
                </p>
            </div>

            {/* Right side */}
            <button onClick={logout} className="bg-white text-indigo-600 font-medium px-5 py-2 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out">
                Logout
            </button>
        </nav>
    )
}

export default Navbar
