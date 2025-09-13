import React from "react";

function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          About Us
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">MediCare Appointment System</span>, 
          your trusted platform to book doctor appointments quickly and easily.  
          Our mission is to make healthcare accessible by connecting patients with 
          doctors in just a few clicks. Whether you need a general physician, 
          specialist, or online consultation, we are here to help.
        </p>

        {/* Why Choose Us */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>📅 Easy and fast doctor appointment booking</li>
          <li>👨‍⚕️ Access to experienced and verified doctors</li>
          <li>💻 Online & offline consultation options</li>
          <li>⏱️ Save time with hassle-free scheduling</li>
        </ul>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            We are committed to bringing healthcare closer to you.  
            <br />
            <span className="font-semibold text-indigo-600">
              Your health, our priority.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
