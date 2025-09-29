import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../Context/AdminContext';
import { toast } from 'react-toastify';


function Login() {
    const { setAToken, backendUrl } = useContext(AdminContext);
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === "Admin") {
                const { data } = await axios.post(backendUrl + "/api/v1/admin/login", {
                    email,
                    password
                })
                if (data.token) {
                    console.log("Login response:", data);
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                } else {
                    console.log("Login failed:", data);
                }

            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                {/* Title */}
                <div className="text-center mb-6">
                    <p className="text-2xl font-semibold text-gray-700">
                        <span className="text-indigo-600">{state}</span> Login
                    </p>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Login button */}
                <button


                    className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
                >
                    Login
                </button>

                {/* Switch button */}
                <div className="mt-4 text-center">
                    {state === "Admin" ? (
                        <button
                            type="button"
                            onClick={() => setState("Doctor")}
                            className="text-sm cursor-pointer text-indigo-600 hover:underline"
                        >
                            Login as Doctor?
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setState("Admin")}
                            className="text-sm cursor-pointer text-indigo-600 hover:underline"
                        >
                            Login as Admin?
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Login;
