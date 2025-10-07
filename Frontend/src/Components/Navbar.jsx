import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import dropdownicon from "../Assets/dropdown_icon.svg";
import { AppContext } from "../Context/AppContextProvider";
import uplaodarea from "../Assets/upload_area.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 relative overflow-visible">
      <nav className="h-[65px] flex items-center justify-between px-4 md:px-16 lg:px-24 relative overflow-visible">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-[140px] md:w-[150px] relative z-10"
        />


        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-800">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`font-medium transition ${isActive ? "text-blue-600" : "hover:text-blue-600"
                    }`}
                >
                  {item.name}
                </Link>
                {isActive && (
                  <hr className="w-6 border-t-2 border-blue-600 mt-1" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Right */}
        {token ? (
          <div className="hidden md:flex items-center space-x-3 relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={userData?.image || uplaodarea}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
              <img src={dropdownicon} alt="Dropdown" className="w-3" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white text-gray-800 shadow-md rounded-md py-2 w-44 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/myprofile");
                    setIsDropdownOpen(false);
                  }}
                >
                  My Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/my-appoinment");
                    setIsDropdownOpen(false);
                  }}
                >
                  My Appointments
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
            className="hidden md:inline bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-all"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}

        {/* Mobile Right */}
        <div className="flex items-center space-x-3 md:hidden relative">
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

              {isDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white text-gray-800 shadow-md rounded-md py-2 w-44 z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/myprofile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/my-appoinment");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Appointments
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="active:scale-90 transition"
          >
            {isMenuOpen ? (
              <FaTimes size={24} className="text-gray-800" />
            ) : (
              <FaBars size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-white shadow-lg p-5 md:hidden z-40 transition-all">
          <ul className="flex flex-col space-y-5 text-gray-800 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block ${location.pathname === item.path
                      ? "text-blue-600"
                      : "hover:text-blue-600"
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
              className="bg-blue-600 text-white mt-6 text-base font-medium hover:bg-blue-700 active:scale-95 transition-all w-full py-3 rounded-full"
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
    </div>
  );
}

export default Navbar;
