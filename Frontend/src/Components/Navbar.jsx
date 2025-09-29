import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import dropdownicon from "../Assets/dropdown_icon.svg";
import { AppContext } from "../Context/AppContextProvider";
import uplaodarea from "../Assets/upload_area.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // get current route
  const { token, setToken, userData } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(""); 
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="text-white w-full">
      {/* Navbar */}
      <nav className="mt-5 relative h-[45px] flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-900 transition-all ">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-[154px] md:w-[150px] relative z-10 bg-white"
        />

        {/* Desktop Menu */}
        <ul className="text-lg hidden md:flex items-center space-x-8 md:pl-28">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="flex flex-col items-center cursor-pointer">
                <Link
                  to={item.path}
                  className={`transition ${isActive ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  {item.name}
                </Link>
                {isActive && (
                  <hr className="w-6 border-t-2 border-blue-600 mt-1 transition-all" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Side */}
        {token ? (
          <div className="hidden md:flex items-center space-x-3 relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={userData?.image || uplaodarea}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <img src={dropdownicon} alt="Dropdown" className="w-3" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-gray-800 shadow-md rounded-md py-2 w-40 z-50 pointer-events-auto">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/myprofile");
                    setIsDropdownOpen(false);
                  }}
                >
                  My Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/my-appoinment");
                    setIsDropdownOpen(false);
                  }}
                >
                  My Appointments
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    logOut();
                    setIsDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="hidden md:inline bg-blue-600 text-white hover:bg-blue-700 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}

        {/* Mobile Right Side */}
        <div className="flex items-center space-x-4 md:hidden relative">
          {token && (
            <div className="relative">
              <button
                className="flex items-center space-x-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={userData?.image || uplaodarea}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border"
                />
                <img src={dropdownicon} alt="Dropdown" className="w-3" />
              </button>

              {/* Mobile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white text-gray-800 shadow-md rounded-md py-2 w-40 z-50 pointer-events-auto">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/myprofile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/my-appoinment");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Appointments
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      logOut();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button
            aria-label="menu-btn"
            type="button"
            className="inline-block md:hidden active:scale-90 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes size={28} className="text-gray-900" />
            ) : (
              <FaBars size={28} className="text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu absolute top-[80px] left-0 w-full bg-white shadow-sm p-6 md:hidden z-40">
            <ul className="flex flex-col space-y-4 text-lg">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`text-sm ${
                      location.pathname === item.path ? "text-blue-600" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {!token && (
              <button
                type="button"
                className="bg-blue-600 text-white mt-6 text-sm hover:bg-blue-700 active:scale-95 transition-all w-40 h-11 rounded-full"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
              >
                Create Account
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
