import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../Assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand + About */}
        <div className="text-center md:text-left">
          <img src={logo} alt="HealthQ Logo" className="h-19 mx-auto md:mx-0 mb-4" />
          <p className="text-sm leading-relaxed text-gray-600">
            Trusted doctors providing compassionate care with expertise. 
            We believe in a patient-first approach, ensuring healthier 
            lives and better well-being for every individual.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">🏠 Home</a></li>
            <li><a href="/doctors" className="hover:text-blue-600 transition">👨‍⚕️ Find Doctors</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">ℹ️ About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">📩 Contact</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-sm">📍 123 Health Street, Bhopal, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm mb-4">✉️ support@healthq.com</p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-pink-500 text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700 text-xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          © 2025 <span className="font-semibold text-blue-600">HealthQ</span>. Made with ❤️ for better health.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
