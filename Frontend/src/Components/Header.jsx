import headerimage from "../Assets/header_img.png";
import groupprofile from "../Assets/group_profiles.png";

function Header() {
  return (
    <section className=" mt-7 bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className=" text-4xl md:text-5xl md:font-extrabold text-gray-900 leading-tight">
            Book <span className="text-blue-600">appointments</span> <br />
            with trusted <span className="text-blue-600">doctors</span>
          </h1>

          {/* Group Profiles + Description */}
          <div className="flex flex-col md:flex-row items-center md:items-start mt-6 gap-4">
            <img
              src={groupprofile}
              alt="Group Profile"
              className="h-14 md:h-16 rounded-full shadow-md"
            />
            <p className="text-gray-700 text-base md:text-lg max-w-md leading-relaxed">
              Compassionate doctor dedicated to providing quality care, accurate
              treatment, and a patient-first approach to improve health and
              well-being.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={headerimage}
            alt="Doctor Header"
            className="w-72 md:w-[28rem] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Header;
